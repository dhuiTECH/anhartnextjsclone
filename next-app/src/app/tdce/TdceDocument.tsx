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
} from '@/lib/tdce-calculator';

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 36,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  header: {
    marginBottom: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 9,
    color: '#4B5563',
  },
  value: {
    fontSize: 9,
    fontWeight: 600,
  },
  cardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 6,
  },
  cardLabel: {
    fontSize: 8,
    color: '#6B7280',
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 11,
    fontWeight: 700,
  },
  table: {
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableLabel: {
    fontSize: 9,
  },
  tableValue: {
    fontSize: 9,
    fontWeight: 600,
  },
  footer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  small: {
    fontSize: 8,
    color: '#6B7280',
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
  const addressLine = `${meta.address || ''}${meta.city ? `, ${meta.city}` : ''}${
    meta.province ? `, ${meta.province}` : ''
  }${meta.postalCode ? ` ${meta.postalCode}` : ''}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{projectTitle}</Text>
          <Text style={styles.subtitle}>Total Development Cost Estimate (TDCE)</Text>
          {addressLine.trim().length > 0 && (
            <Text style={[styles.subtitle, { marginTop: 2 }]}>{addressLine}</Text>
          )}
          <Text style={[styles.small, { marginTop: 4 }]}>
            Generated {generatedAt.toLocaleDateString?.() ?? String(generatedAt)} • v{version}
          </Text>
        </View>

        <View style={styles.cardGrid}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Total Development Cost</Text>
            <Text style={styles.cardValue}>{formatCurrency(costs.totalDevelopmentCost)}</Text>
            <Text style={styles.small}>
              {formatCurrency(costMetrics.costPerUnit)}/unit
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Net Operating Income</Text>
            <Text style={styles.cardValue}>{formatCurrency(opMetrics.noi)}</Text>
            <Text style={styles.small}>Stabilized Year 1</Text>
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.sectionTitle}>Uses of Funds</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Land Acquisition</Text>
              <Text style={styles.tableValue}>{formatCurrency(costs.landCost)}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Hard Costs</Text>
              <Text style={styles.tableValue}>{formatCurrency(costs.hardCosts)}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Soft Costs</Text>
              <Text style={styles.tableValue}>{formatCurrency(costs.softCosts)}</Text>
            </View>
            <View style={[styles.tableRow, { backgroundColor: '#F3F4F6' }]}>
              <Text style={[styles.tableLabel, { fontWeight: 700 }]}>
                Total Development Cost
              </Text>
              <Text style={[styles.tableValue, { fontSize: 10 }]}>
                {formatCurrency(costs.totalDevelopmentCost)}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.sectionTitle}>Operating Pro Forma</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Gross Potential Rent</Text>
              <Text style={styles.tableValue}>
                {formatCurrency(income.grossPotentialRent)}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>
                Vacancy ({formatPercent(operations.vacancyRate)})
              </Text>
              <Text style={styles.tableValue}>
                ({formatCurrency(
                  income.grossPotentialRent - income.effectiveGrossIncome
                )})
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Effective Gross Income</Text>
              <Text style={styles.tableValue}>
                {formatCurrency(income.effectiveGrossIncome)}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>
                Operating Expenses ({formatPercent(operations.operatingExpenseRatio)})
              </Text>
              <Text style={styles.tableValue}>
                ({formatCurrency(opMetrics.operatingExpenses)})
              </Text>
            </View>
            <View style={[styles.tableRow, { backgroundColor: '#F3F4F6' }]}>
              <Text style={[styles.tableLabel, { fontWeight: 700 }]}>
                Net Operating Income
              </Text>
              <Text style={styles.tableValue}>{formatCurrency(opMetrics.noi)}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.sectionTitle}>Physical Summary</Text>
          <View>
            <View style={styles.row}>
              <Text style={styles.label}>Site Area</Text>
              <Text style={styles.value}>
                {formatNumber(physicals.siteAreaSqFt)} sf
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>GFA</Text>
              <Text style={styles.value}>
                {formatNumber(
                  physicals.grossFloorAreaSqFt ??
                    physicals.grossBuildableSqFt ??
                    0
                )}{' '}
                sf
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>FSR</Text>
              <Text style={styles.value}>{areas.floorSpaceRatio.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Efficiency</Text>
              <Text style={styles.value}>
                {formatPercent(physicals.efficiencyRatio)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Net Rentable</Text>
              <Text style={styles.value}>
                {formatNumber(income.residentialNetRentableArea)} sf
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Total Units</Text>
              <Text style={styles.value}>{physicals.totalUnits}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Avg Unit Size</Text>
              <Text style={styles.value}>
                {formatNumber(areas.avgUnitSize)} sf
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Cap Rate</Text>
              <Text style={styles.value}>{formatPercent(opMetrics.capRate)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>DSCR</Text>
              <Text style={styles.value}>{formatRatio(opMetrics.dscr)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.small}>
            Class D estimate (±25%) — for planning purposes only. Consult qualified
            professionals before making investment decisions.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default TdceDocument;