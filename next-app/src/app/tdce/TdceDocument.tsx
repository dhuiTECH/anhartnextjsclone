import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { TdceDocument as TdceDocType } from '@/types/tdce';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatRatio,
  getEffectiveSiteAreaSqFt,
} from '@/lib/tdce-calculator';

const BEDROOM_LABELS: Record<number, string> = {
  0: 'Studio',
  1: '1-Bed only',
  2: '2-Bed only',
  3: '3-Bed only',
  4: '4-Bed only',
  5: '5+ Bed only',
};

function getBedroomLabel(bedrooms: number): string {
  return BEDROOM_LABELS[bedrooms] ?? `${bedrooms}-Bed`;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 36,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  header: {
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 9,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 4,
    marginTop: 8,
  },
  subHeading: {
    fontSize: 8,
    fontWeight: 600,
    color: '#6B7280',
    marginTop: 6,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  label: {
    fontSize: 8,
    color: '#4B5563',
  },
  value: {
    fontSize: 8,
    fontWeight: 600,
  },
  cardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    padding: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 6,
  },
  cardLabel: {
    fontSize: 7,
    color: '#6B7280',
    marginBottom: 1,
  },
  cardValue: {
    fontSize: 10,
    fontWeight: 700,
  },
  table: {
    marginTop: 2,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableLabel: {
    fontSize: 8,
  },
  tableValue: {
    fontSize: 8,
    fontWeight: 600,
  },
  footer: {
    marginTop: 12,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  small: {
    fontSize: 7,
    color: '#6B7280',
  },
  note: {
    borderLeftWidth: 2,
    borderLeftColor: '#E5E7EB',
    paddingLeft: 8,
    marginTop: 4,
    marginBottom: 4,
  },
});

interface TdceDocumentProps {
  data: TdceDocType;
}

export function TdceDocument({ data }: TdceDocumentProps) {
  const { input, output, generatedAt, version } = data;
  const { meta, physicals, financials, operations } = input;
  const { costs, costMetrics, income, operations: opMetrics, areas } = output;

  const projectTitle = meta.projectTitle || 'Untitled Project';
  const scenarioSuffix = meta.scenarioName ? ` — ${meta.scenarioName}` : '';
  const addressLine = `${meta.address || ''}${meta.city ? `, ${meta.city}` : ''}${
    meta.province ? `, ${meta.province}` : ''
  }${meta.postalCode ? ` ${meta.postalCode}` : ''}`.trim();

  const precisionClass = meta.estimatePrecisionClass ?? 'D';
  const precisionLabel = precisionClass === 'C' ? 'Class C ±15%' : 'Class D ±30%';

  const effectiveSiteArea = getEffectiveSiteAreaSqFt(physicals);
  const resolvedGsf = areas.resolvedGsf ?? 0;
  const resolvedUnits = areas.resolvedTotalUnits ?? physicals.totalUnits ?? 0;
  const hasCommercial = (financials.commercialSqFt ?? 0) > 0;
  const grants = financials.grants ?? [];
  const totalGrants = grants.reduce((s, g) => s + (g.amount ?? 0), 0);
  const sponsorEquity = financials.sponsorEquity ?? 0;
  const maxMortgage = opMetrics.maxMortgage ?? 0;
  const fundingGap = opMetrics.fundingGap ?? 0;
  const tdc = costs.totalDevelopmentCost;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Project header */}
        <View style={styles.header}>
          <Text style={styles.title}>{projectTitle}{scenarioSuffix}</Text>
          <Text style={styles.subtitle}>Total Development Cost Estimate (TDCE)</Text>
          {addressLine.length > 0 && (
            <Text style={[styles.subtitle, { marginTop: 1 }]}>{addressLine}</Text>
          )}
          {(meta.contactName || meta.contactEmail) && (
            <Text style={[styles.small, { marginTop: 2 }]}>
              Contact: {meta.contactName || '—'}
              {meta.contactEmail ? ` · ${meta.contactEmail}` : ''}
            </Text>
          )}
          <Text style={[styles.small, { marginTop: 2 }]}>
            Cost Benchmark: Altus Group Canadian Cost Guide · {precisionLabel}
          </Text>
          <Text style={[styles.small, { marginTop: 1 }]}>
            Generated {generatedAt instanceof Date ? generatedAt.toLocaleDateString('en-CA') : String(generatedAt)} · v{version}
          </Text>
        </View>

        {/* Summary cards */}
        <View style={styles.cardGrid}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Total Development Cost</Text>
            <Text style={styles.cardValue}>{formatCurrency(costs.totalDevelopmentCost)}</Text>
            <Text style={styles.small}>
              {formatCurrency(costMetrics.costPerUnit)}/unit · {formatCurrency(costMetrics.costPerSqFt)}/sf
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Net Operating Income</Text>
            <Text style={styles.cardValue}>{formatCurrency(opMetrics.noi)}</Text>
            <Text style={styles.small}>Stabilized Year 1 · Cap {formatPercent(opMetrics.capRate)}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Funding Gap / Surplus</Text>
            <Text style={[styles.cardValue, { color: fundingGap <= 0 ? '#059669' : '#DC2626' }]}>
              {formatCurrency(Math.abs(fundingGap))}
            </Text>
            <Text style={styles.small}>{fundingGap <= 0 ? 'Fully funded' : 'Gap to fill'}</Text>
          </View>
        </View>

        {/* Built form summary */}
        <Text style={styles.sectionTitle}>1. Development Summary & Built Form</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Site Area</Text>
          <Text style={styles.value}>
            {effectiveSiteArea > 0 ? `${formatNumber(effectiveSiteArea)} sf` : '—'}
          </Text>
        </View>
        {physicals.siteDimensionsLengthFt != null && physicals.siteDimensionsWidthFt != null && (
          <View style={styles.row}>
            <Text style={styles.label}>Site Dimensions</Text>
            <Text style={styles.value}>
              {physicals.siteDimensionsLengthFt} ft × {physicals.siteDimensionsWidthFt} ft
            </Text>
          </View>
        )}
        {(meta.zoning || meta.zoningNote) && (
          <View style={styles.row}>
            <Text style={styles.label}>Zoning</Text>
            <Text style={styles.value}>
              {meta.zoning && meta.zoningNote ? `${meta.zoning} (${meta.zoningNote})` : meta.zoning || meta.zoningNote}
            </Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Gross Floor Area</Text>
          <Text style={styles.value}>{resolvedGsf > 0 ? `${formatNumber(Math.round(resolvedGsf))} sf` : '—'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Net Residential Area</Text>
          <Text style={styles.value}>
            {formatNumber(Math.round(income.residentialNetRentableArea))} sf
            {physicals.efficiencyRatio != null ? ` (${Math.round(physicals.efficiencyRatio * 100)}% eff.)` : ''}
          </Text>
        </View>
        {hasCommercial && (
          <View style={styles.row}>
            <Text style={styles.label}>Commercial Area</Text>
            <Text style={styles.value}>{formatNumber(financials.commercialSqFt ?? 0)} sf</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Total Units</Text>
          <Text style={styles.value}>{resolvedUnits} residential</Text>
        </View>
        {(physicals.parkingSpaces ?? 0) > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>Parking Spaces</Text>
            <Text style={styles.value}>{physicals.parkingSpaces} stalls</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>FSR</Text>
          <Text style={styles.value}>
            {areas.floorSpaceRatio.toFixed(2)}
            {hasCommercial && areas.residentialFSR != null && areas.commercialFSR != null
              ? ` (res. ${areas.residentialFSR.toFixed(2)}, comm. ${areas.commercialFSR.toFixed(2)})`
              : ''}
          </Text>
        </View>

        {physicals.unitMix && physicals.unitMix.length > 0 && (
          <>
            <Text style={styles.subHeading}>Unit Mix</Text>
            {[...physicals.unitMix]
              .sort((a, b) => a.bedrooms - b.bedrooms)
              .map((unit, i) => (
                <View key={i} style={styles.row}>
                  <Text style={styles.label}>
                    {getBedroomLabel(unit.bedrooms)}
                    {(unit.affordableCount ?? 0) > 0 ? ` (${unit.affordableCount} affordable)` : ''}
                  </Text>
                  <Text style={styles.value}>{unit.count} units</Text>
                </View>
              ))}
          </>
        )}

        {/* Uses of funds */}
        <Text style={styles.sectionTitle}>2. Total Development Cost — Uses</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Land</Text>
            <Text style={styles.tableValue}>{formatCurrency(costs.landCost)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>
              Hard construction — {formatNumber(Math.round(resolvedGsf))} sf × ${financials.hardCostPerSqFt}/sf
            </Text>
            <Text style={styles.tableValue}>{formatCurrency(costs.hardCosts)}</Text>
          </View>
          {costs.hardCostContingency > 0 && (
            <View style={[styles.tableRow, { paddingLeft: 8 }]}>
              <Text style={styles.tableLabel}>Hard cost contingency</Text>
              <Text style={styles.tableValue}>{formatCurrency(costs.hardCostContingency)}</Text>
            </View>
          )}
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>
              Soft costs — {formatPercent(financials.softCostPercent ?? 0.25)} of hard
            </Text>
            <Text style={styles.tableValue}>{formatCurrency(costs.softCosts)}</Text>
          </View>
          {costs.softCostContingency > 0 && (
            <View style={[styles.tableRow, { paddingLeft: 8 }]}>
              <Text style={styles.tableLabel}>Soft cost contingency</Text>
              <Text style={styles.tableValue}>{formatCurrency(costs.softCostContingency)}</Text>
            </View>
          )}
          {costs.developmentFees > 0 && (
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Development fees</Text>
              <Text style={styles.tableValue}>{formatCurrency(costs.developmentFees)}</Text>
            </View>
          )}
          {costs.financingCosts > 0 && (
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Financing costs</Text>
              <Text style={styles.tableValue}>{formatCurrency(costs.financingCosts)}</Text>
            </View>
          )}
          {costs.reserves > 0 && (
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Reserves (capitalized)</Text>
              <Text style={styles.tableValue}>{formatCurrency(costs.reserves)}</Text>
            </View>
          )}
          <View style={[styles.tableRow, { backgroundColor: '#F3F4F6' }]}>
            <Text style={[styles.tableLabel, { fontWeight: 700 }]}>Total development cost</Text>
            <Text style={[styles.tableValue, { fontSize: 9 }]}>{formatCurrency(tdc)}</Text>
          </View>
        </View>

        {/* Operating pro forma */}
        <Text style={styles.sectionTitle}>3. Operating Pro Forma — Stabilized</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Gross potential rental income</Text>
            <Text style={styles.tableValue}>{formatCurrency(income.grossPotentialRent)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>
              Vacancy & credit loss ({formatPercent(operations.vacancyRate ?? 0.03)})
            </Text>
            <Text style={styles.tableValue}>
              ({formatCurrency(income.grossPotentialRent - income.effectiveGrossIncome)})
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Effective gross income</Text>
            <Text style={styles.tableValue}>{formatCurrency(income.effectiveGrossIncome)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>
              Operating expenses ({formatPercent(operations.operatingExpenseRatio ?? 0.35)} of EGI)
            </Text>
            <Text style={styles.tableValue}>({formatCurrency(opMetrics.operatingExpenses)})</Text>
          </View>
          {(opMetrics.replacementReserves ?? 0) > 0 && (
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Replacement reserves</Text>
              <Text style={styles.tableValue}>({formatCurrency(opMetrics.replacementReserves ?? 0)})</Text>
            </View>
          )}
          <View style={[styles.tableRow, { backgroundColor: '#F3F4F6' }]}>
            <Text style={[styles.tableLabel, { fontWeight: 700 }]}>Net operating income</Text>
            <Text style={styles.tableValue}>{formatCurrency(opMetrics.noi)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>
              Annual debt service (DSCR {(operations.dscrTarget ?? 1.1).toFixed(2)}x)
            </Text>
            <Text style={styles.tableValue}>
              ({formatCurrency(opMetrics.annualDebtService ?? 0)})
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Residual cash flow</Text>
            <Text style={styles.tableValue}>
              {formatCurrency(opMetrics.annualOperatingSurplus ?? 0)}
            </Text>
          </View>
        </View>

        {/* Capital stack */}
        <Text style={styles.sectionTitle}>4. Capital Stack — Sources</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>First mortgage (CMHC MLI Select)</Text>
            <Text style={styles.tableValue}>{formatCurrency(maxMortgage)}</Text>
          </View>
          {grants.length > 0 ? (
            grants.map((g, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.tableLabel}>{g.name || 'Grant'}{g.status ? ` (${g.status})` : ''}</Text>
                <Text style={styles.tableValue}>{formatCurrency(g.amount)}</Text>
              </View>
            ))
          ) : (
            <View style={styles.tableRow}>
              <Text style={[styles.tableLabel, { color: '#9CA3AF' }]}>Grants</Text>
              <Text style={[styles.tableValue, { color: '#9CA3AF' }]}>None entered</Text>
            </View>
          )}
          {sponsorEquity > 0 && (
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Sponsor equity</Text>
              <Text style={styles.tableValue}>{formatCurrency(sponsorEquity)}</Text>
            </View>
          )}
          <View style={[styles.tableRow, { backgroundColor: '#F3F4F6' }]}>
            <Text style={[styles.tableLabel, { fontWeight: 700 }]}>Total identified</Text>
            <Text style={styles.tableValue}>{formatCurrency(maxMortgage + totalGrants + sponsorEquity)}</Text>
          </View>
        </View>

        {meta.costAssumptionNote && (
          <View style={styles.note}>
            <Text style={styles.small}>{meta.costAssumptionNote}</Text>
          </View>
        )}

        {meta.description && (
          <View style={[styles.note, { marginTop: 6 }]}>
            <Text style={[styles.subHeading, { marginTop: 0 }]}>Notes</Text>
            <Text style={styles.small}>{meta.description}</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.small}>
            {precisionLabel} — for planning purposes only. Consult qualified professionals before making investment decisions.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default TdceDocument;
