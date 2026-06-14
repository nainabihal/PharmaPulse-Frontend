import { useState } from "react";

export default function AnalyticsPage({
    searchQuery,
    productIntelligence = [],
    finalExecutiveProductIntelligenceReport = [],
    loading = false,
    error = null
}) {
    const [product, setProduct] = useState(false);
    const [competitors, setCompetitors] = useState(false);

    const productIndex =
        finalExecutiveProductIntelligenceReport.findIndex(
        (p) => p.product_name === searchQuery
        );

    if (loading) {
        return (
            <div className="grid col-span-3 grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
                {/* Product Summary Skeleton */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <div className="h-6 w-32 skeleton rounded"></div>
                            <div className="h-4 w-20 skeleton rounded"></div>
                        </div>
                        <div className="h-8 w-16 skeleton rounded-lg"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-4 w-full skeleton rounded"></div>
                        <div className="h-4 w-3/4 skeleton rounded"></div>
                        <div className="h-4 w-5/6 skeleton rounded"></div>
                    </div>
                </div>
                
                {/* Metrics Cards Skeleton */}
                <div className="flex flex-col gap-4">
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex-1 space-y-4">
                        <div className="h-4 w-24 skeleton rounded"></div>
                        <div className="h-10 w-full skeleton rounded"></div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex-1 space-y-4">
                        <div className="h-4 w-24 skeleton rounded"></div>
                        <div className="h-10 w-full skeleton rounded"></div>
                    </div>
                </div>

                {/* Competitors Skeleton */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
                    <div className="h-5 w-28 skeleton rounded"></div>
                    <div className="space-y-5">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center">
                                <div className="h-4 w-24 skeleton rounded"></div>
                                <div className="h-4 w-12 skeleton rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="col-span-3 flex items-center justify-center p-12 text-red-400">
                {error}
            </div>
        );
    }

    if (productIndex === -1) {
        return (
            <div className="col-span-3 flex items-center justify-center p-12 text-slate-400">
                No report found for "{searchQuery}"
            </div>
        );
    }

    const summaryReport = finalExecutiveProductIntelligenceReport[productIndex];
    // Find the matching detailed record by product name to avoid index mismatch
    const detailedReport =
        productIntelligence.find(
            (p) => p.target_product === summaryReport.product_name
        ) ?? productIntelligence[productIndex];

    if (!detailedReport) {
        return (
            <div className="col-span-3 flex items-center justify-center p-12 text-slate-400">
                Report is still generating for "{searchQuery}"&mdash;please try again in a moment.
            </div>
        );
    }

    const competitorsList = detailedReport.product_scout.similar_products;
    const launchStrategy = detailedReport.strategy_recommendation.new_product_launch_strategy;
    const marketStrategy = detailedReport.strategy_recommendation.existing_product_market_strategy;
    
    // Helper for risk color
    const getRiskColorScore = (score) => {
        if (score >= 70) return "text-red-500";
        if (score >= 40) return "text-yellow-400";
        return "text-green-500";
    };
    const getRiskColorBar = (score) => {
        if (score >= 70) return "bg-green-500";
        if (score >= 40) return "bg-yellow-300";
        return "bg-red-400";
    };

    return (
        <div className="grid col-span-3 grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
            
            {/* PRODUCT SECTION */}
            <aside
                onClick={() => {setProduct(true)}} 
                onMouseLeave={() => {setProduct(false)}} 
                className={`
                    bg-white rounded-2xl p-6 animate-fadeInUp
                    shadow-sm border border-slate-100
                    transition-all duration-300 ease-out
                    hover:scale-[1.015]
                    hover:shadow-xl
                    hover:border-slate-200
                    ${product ? 'col-span-2 scale-[1.01] shadow-xl z-10' : 'col-span-1 scale-100'} 
                    ${competitors ? 'hidden' : ''}`}
                style={{ animationDelay: '0.1s' }}
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 capitalize">{summaryReport.product_name}</h2>
                        <span className="text-sm text-slate-500 font-medium">{summaryReport.market_position}</span>
                    </div>
                    <div className="text-right">
                         <div className={`text-2xl font-bold ${getRiskColorScore(detailedReport.risk_and_sales_monitoring.overall_risk_score)}`}>{detailedReport.risk_and_sales_monitoring.overall_risk_score}/100</div>
                         <div className="text-xs text-slate-500 uppercase tracking-wide">Risk Score</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <InfoItem label="Sales Outlook" value={summaryReport.monthly_sales_outlook} />
                    <InfoItem label="Regulatory Risk" value={detailedReport.risk_and_sales_monitoring.risk_assessment.regulatory_risk} />
                    
                    {/* Progress Bars for Scores */}
                    <div className="pt-2">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500">Market Opportunity</span>
                            <span className="font-medium">{detailedReport.risk_and_sales_monitoring.market_opportunity_score}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${getRiskColorBar(detailedReport.risk_and_sales_monitoring.market_opportunity_score)} rounded-full transition-all duration-500`}
                                style={{ width: `${detailedReport.risk_and_sales_monitoring.market_opportunity_score}%`}}
                            />
                        </div>
                    </div>
                </div>

                {product && (
                <div className="mt-8 pt-6 border-t border-slate-100 space-y-4 animate-in fade-in duration-300">
                    <h3 className="font-semibold text-slate-800 mb-2">Detailed Risk Assessment</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <InfoItem label="Pricing Pressure" value={detailedReport.risk_and_sales_monitoring.risk_assessment.pricing_pressure} />
                        <InfoItem label="Competitive Threat" value={detailedReport.risk_and_sales_monitoring.risk_assessment.competitive_threat} />
                        <InfoItem label="Trend Direction" value={detailedReport.risk_and_sales_monitoring.sales_momentum.trend_direction} />
                        <InfoItem label="Growth Signal" value={detailedReport.risk_and_sales_monitoring.sales_momentum.growth_signal_strength} />
                    </div>
                </div>
                )}
            </aside>

            {/* KEY METRICS CARDS */}
            <div 
                className={`
                    flex flex-col gap-4 animate-fadeInUp
                    ${product || competitors ? 'hidden md:flex' : ''}
                `}
                style={{ animationDelay: '0.2s' }}
            >
                 <div className="
                    group
                    bg-white rounded-2xl p-6
                    shadow-sm border border-slate-100 flex-1
                    transition-all duration-200 ease-out
                    hover:scale-[1.015]
                    hover:shadow-xl
                    hover:border-slate-200
                    hover:bg-green-500
                ">

                     <h3 
                        className={`text-xs font-semibold text-green-600 group-hover:text-white uppercase tracking-wider mb-3`}>Strongest USP</h3>
                     <p className="text-sm font-medium text-slate-600 group-hover:text-white leading-relaxed">{summaryReport.strongest_usp}</p>
                 </div>
                 <div className="
                    group
                    bg-white rounded-2xl p-6
                    shadow-sm border border-slate-100 flex-1
                    transition-all duration-200 ease-out
                    hover:scale-[1.015]
                    hover:shadow-xl
                    hover:border-slate-200
                    hover:bg-red-500
                ">

                     <h3 className="text-xs font-semibold text-red-600 group-hover:text-white uppercase tracking-wider mb-3">Biggest Risk</h3>
                     <p className="text-sm font-medium text-slate-600 group-hover:text-white leading-relaxed">{summaryReport.biggest_risk_factor}</p>
                 </div>
            </div>

            {/* COMPETITORS SECTION */}
            <aside
                onClick={() => {
                    if (competitorsList.length > 0) {
                        setCompetitors(true);
                    }
                }} 
                onMouseLeave={() => {setCompetitors(false)}}
                className={`
                    bg-white rounded-2xl p-6 animate-fadeInUp
                    shadow-sm border border-slate-100
                    transition-all duration-300 ease-out
                    hover:scale-[1.015]
                    hover:shadow-xl
                    hover:border-slate-200
                    ${product ? 'hidden' : ''}
                    ${competitors 
                    ? 'col-span-2 scale-[1.01] shadow-xl z-10' 
                    : 'col-span-1 scale-100'
                    }
                    ${competitorsList.length > 0 ? 'cursor-pointer' : ''}
                `}
                style={{ animationDelay: '0.3s' }}
            >
                <h3 className="text-lg font-bold text-slate-800 mb-4">Competitors</h3>
                
                <div className="space-y-4">
                    {competitorsList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200 p-4">
                            <span className="text-3xl mb-2 animate-pulse">🔍</span>
                            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">No Competitors Found</h4>
                            <p className="text-[11px] text-slate-400 mt-1 max-w-[200px]">No similar products in the same therapy area were returned by the pipeline.</p>
                        </div>
                    ) : (
                        competitorsList.map((comp, idx) => {
                            const marketShare = parseFloat(comp.estimated_market_share) || 0;
                            return (
                                <div key={idx} className="group">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-slate-700 capitalize">{comp.product_name}</span>
                                        <span className="text-xs font-bold text-slate-500">{comp.estimated_market_share || "0%"} Share</span>
                                    </div>
                                    {/* Market Share Bar */}
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                                        <div 
                                            className="h-full bg-indigo-500 rounded-full transition-all duration-500 group-hover:bg-indigo-650" 
                                            style={{ width: `${marketShare}%`}}
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-500">
                                        <span>{comp.company || "Unknown Company"}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-100/50`}>
                                            {comp.approval_status || "Approved"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {competitors && competitorsList.length > 0 && (
                     <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                        {(!detailedReport.usp_analysis?.comparators || detailedReport.usp_analysis.comparators.length === 0) ? (
                            <div className="col-span-2 text-center text-xs text-slate-400 py-4">No detailed comparator USP analysis available.</div>
                        ) : (
                            detailedReport.usp_analysis.comparators.map((comp, idx) => (
                                <div key={idx} className="bg-slate-50 p-4 rounded-xl">
                                    <h4 className="font-semibold text-slate-800 capitalize mb-2">{comp.product_name} Analysis</h4>
                                    <div className="space-y-2">
                                        <p className="text-xs text-slate-650 leading-relaxed"><span className="font-semibold text-slate-700">Why Strong:</span> {comp.why_sales_are_strong}</p>
                                        <div>
                                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">USPs:</span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {(comp.unique_selling_points || []).map((usp, i) => (
                                                    <span key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-600 shadow-sm">{usp}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                     </div>
                )}
            </aside>

            {/* STRATEGY & CHARTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-1 md:col-span-3">
                <div 
                    className="
                        bg-white rounded-2xl p-6 animate-fadeInUp
                        shadow-sm border border-slate-100
                        transition-all duration-300 ease-out
                        hover:scale-[1.015]
                        hover:shadow-xl
                        hover:border-slate-200
                    "
                    style={{ animationDelay: '0.4s' }}
                >

                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h3 className="font-bold text-slate-800">Launch Strategy</h3>
                    </div>
                    <div className="space-y-4">
                        <StrategyItem label="Pricing" value={launchStrategy.pricing_strategy} />
                        <StrategyItem label="Positioning" value={launchStrategy.positioning_strategy} />
                        <StrategyItem label="Target" value={launchStrategy.target_segment} />
                    </div>
                </div>

                <div 
                    className="
                        bg-white rounded-2xl p-6 animate-fadeInUp
                        shadow-sm border border-slate-100
                        transition-all duration-300 ease-out
                        hover:scale-[1.015]
                        hover:shadow-xl
                        hover:border-slate-200
                    "
                    style={{ animationDelay: '0.5s' }}
                >

                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <h3 className="font-bold text-slate-800">Defensive Moves</h3>
                    </div>
                    <ul className="space-y-3">
                        {marketStrategy.defensive_moves.map((move, i) => (
                            <li key={i} className="flex gap-3 text-sm text-slate-600">
                                <span className="text-purple-500 mt-0.5">•</span>
                                {move}
                            </li>
                        ))}
                    </ul>
                     <div className="mt-4 pt-4 border-t border-slate-100">
                         <StrategyItem label="Pricing Adjustment" value={marketStrategy.pricing_adjustment} />
                     </div>
                </div>
            </div>

            {/* EXECUTIVE SUMMARY */}
            <div 
                className="
                    col-span-1 md:col-span-3 animate-fadeInUp
                    bg-gradient-to-r from-slate-900 to-slate-800
                    rounded-2xl p-6 shadow-lg text-white
                    transition-all duration-300 ease-out
                    hover:-translate-y-1
                    hover:shadow-2xl
                "
                style={{ animationDelay: '0.6s' }}
            >

                <h3 className="font-bold text-white/90 mb-2 uppercase tracking-wide text-xs">Executive Summary</h3>
                <p className="text-lg font-light leading-relaxed text-slate-100 max-w-4xl">
                    {summaryReport.executive_summary}
                </p>
            </div>

        </div>
    );
}

const InfoItem = ({ label, value }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-slate-500">{label}</span>
        <span className="font-medium text-slate-800">{value}</span>
    </div>
);

const StrategyItem = ({ label, value }) => (
    <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">{label}</span>
        <p className="text-sm text-slate-600 leading-relaxed">{value}</p>
    </div>
);
