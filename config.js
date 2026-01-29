// src/config.js
import { StyleSheet, Dimensions, Platform } from 'react-native';

// AJUSTES DE TELA
const windowWidth = Dimensions.get('window').width;
export const width = Platform.OS === 'web' && windowWidth > 500 ? 400 : windowWidth;
export const CARD_WIDTH = width - 40;
export const QR_SIZE = 125;

// CONFIGURAÇÃO GERAL
export const BACKGROUND_URL = "https://i.postimg.cc/XYj9d0Gn/Design-sem-nome.png";

// CORES
export const COLORS = {
  bg: '#121618',
  blueHeader: '#0026b9',
  cyanBar: '#00FFFF',
  labelGrey: '#666666',
  valueBlack: '#000000',
  pillBtn: '#E6F6FE',
  pillText: '#0066CC',
  divider: '#EEEEEE',
  white: '#FFFFFF',
  cardBg: '#1A2224',
  teal: '#439193',
  greyText: '#818A8F',
  dotActive: '#FFFFFF',
  dotInactive: '#444444'
};

// DADOS (COM A CORREÇÃO DA VÍRGULA)
export const TICKETS_DATA = [
  {
    id: '1',
    eventTitle: "AVENGED SEVENFOLD",
    subTitle: "LIFE IS BUT A DREAM - SP",
    venue: "SÃO PAULO | Allianz Parque",
    countText: "2 Ingressos",
    ticketQuantity: 2,
    dateText: "Sábado 31 15:00",
    image: require('./assets/avenged_sevenfold.png'),
    sortDate: "2026-01-31",
    fullDate: "31/01/2026",
    section: "Cadeira Superior",
    gate: "Portão A",
    rowInfo: "Não numerado",
    open: "12:00",
    start: "15:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 155,00", qrCodeBase: "A7X-SP-01-M" },
      { priceInfo: "Inteira - R$ 310,00", qrCodeBase: "A7X-SP-01-I" }
    ]
  },
  {
    id: '2',
    eventTitle: "AVENGED SEVENFOLD",
    subTitle: "LIFE IS BUT A DREAM - SP",
    venue: "SÃO PAULO | Allianz Parque",
    countText: "2 Ingressos",
    ticketQuantity: 2,
    dateText: "Sábado 31 15:00",
    image: require('./assets/avenged_sevenfold.png'),
    sortDate: "2026-01-31",
    fullDate: "31/01/2026",
    section: "Pista",
    gate: "Portão B",
    rowInfo: "Não numerado",
    open: "12:00",
    start: "15:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 205,00", qrCodeBase: "A7X-SP-02-M" },
      { priceInfo: "Inteira - R$ 410,00", qrCodeBase: "A7X-SP-02-I" }
    ]
  },
  {
    id: '3',
    eventTitle: "AVENGED SEVENFOLD",
    subTitle: "LIFE IS BUT A DREAM - SP",
    venue: "SÃO PAULO | Allianz Parque",
    countText: "2 Ingressos",
    ticketQuantity: 2,
    dateText: "Sábado 31 15:00",
    image: require('./assets/avenged_sevenfold.png'),
    sortDate: "2026-01-31",
    fullDate: "31/01/2026",
    section: "Cadeira Inferior",
    gate: "Portão C",
    rowInfo: "Não numerado",
    open: "12:00",
    start: "15:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 250,00", qrCodeBase: "A7X-SP-03-M" },
      { priceInfo: "Inteira - R$ 500,00", qrCodeBase: "A7X-SP-03-I" }
    ]
  },
  {
    id: '4',
    eventTitle: "AVENGED SEVENFOLD",
    subTitle: "LIFE IS BUT A DREAM - SP",
    venue: "SÃO PAULO | Allianz Parque",
    countText: "2 Ingressos",
    ticketQuantity: 2,
    dateText: "Sábado 31 15:00",
    image: require('./assets/avenged_sevenfold.png'),
    sortDate: "2026-01-31",
    fullDate: "31/01/2026",
    section: "Pista Premium",
    gate: "Portão D",
    rowInfo: "Não numerado",
    open: "12:00",
    start: "15:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 405,00", qrCodeBase: "A7X-SP-04-M" },
      { priceInfo: "Inteira - R$ 810,00", qrCodeBase: "A7X-SP-04-I" }
    ]
  }
];

// ESTILOS
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, alignItems: Platform.OS === 'web' ? 'center' : 'stretch' },
  webWrapper: { width: Platform.OS === 'web' ? width : '100%', flex: 1 },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: COLORS.white, fontSize: 24, fontWeight: '700' },
  headerIcons: { flexDirection: 'row' },
  iconBtn: { backgroundColor: COLORS.cardBg, padding: 8, borderRadius: 8, marginLeft: 10 },
  tabWrapper: { paddingHorizontal: 20, marginBottom: 15 },
  tabContainer: { flexDirection: 'row', backgroundColor: COLORS.cardBg, borderRadius: 10, padding: 4 },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: COLORS.white },
  tabText: { fontWeight: '600', fontSize: 14 },
  textActive: { color: '#000000' },
  textInactive: { color: COLORS.greyText },
  sectionTitle: { color: '#ddd', fontSize: 15, fontWeight: 'bold', marginLeft: 20, marginTop: 10, marginBottom: 10 },
  listCard: { backgroundColor: COLORS.cardBg, flexDirection: 'row', marginHorizontal: 20, marginBottom: 12, borderRadius: 8, height: 105, overflow: 'hidden' },
  listCardImage: { width: 105, height: '100%' },
  listCardInfo: { flex: 1, justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 10 },
  listTopLine: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  listCount: { color: COLORS.teal, fontSize: 13, fontWeight: '600' },
  listDate: { color: COLORS.greyText, fontSize: 13, fontWeight: '400' },
  listTitle: { color: COLORS.white, fontSize: 16, fontWeight: '600', marginBottom: 3 },
  listVenue: { color: COLORS.greyText, fontSize: 13, fontWeight: '400' },
  detailContainer: { flex: 1, backgroundColor: '#121212', alignItems: Platform.OS === 'web' ? 'center' : 'stretch' },
  detailNavBar: { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingBottom: 15, paddingHorizontal: 20, zIndex: 100, backgroundColor: '#121212', width: Platform.OS === 'web' ? width : '100%', },
  navTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginLeft: 10, flexShrink: 1 },
  navSub: { color: '#bbb', fontSize: 13, marginLeft: 10, marginTop: 4, flexShrink: 1 },
  paginationContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 20 },
  paginationDot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  dotActive: { backgroundColor: COLORS.dotActive },
  dotInactive: { backgroundColor: COLORS.dotInactive },
  ticketCardContainer: { width: CARD_WIDTH, marginTop: 10, borderRadius: 16, overflow: 'hidden', backgroundColor: COLORS.white, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5, marginBottom: 20 },
  blueHeaderContainer: { position: 'relative', height: 270, width: '100%', backgroundColor: COLORS.blueHeader, overflow: 'hidden', },
  ticketBlueTop: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  scannerStrip: { height: 6, width: '100%', backgroundColor: 'rgba(0, 255, 255, 0.1)', overflow: 'hidden', position: 'absolute', bottom: 0 },
  scannerBar: { height: '100%', backgroundColor: COLORS.cyanBar, },
  ticketWhiteBottom: { padding: 20, backgroundColor: COLORS.white },
  qrSection: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 },
  qrContainer: { paddingTop: 0 },
  qrInfoColumn: { flex: 1, marginLeft: 15, justifyContent: 'flex-start', },
  label: { color: COLORS.labelGrey, fontSize: 10, fontWeight: '700', marginBottom: 2, textTransform: 'uppercase' },
  valueTitle: { color: COLORS.valueBlack, fontSize: 15, fontWeight: '700', lineHeight: 18, marginBottom: 8 },
  moreInfoBtn: { backgroundColor: COLORS.pillBtn, paddingVertical: 8, borderRadius: 6, alignItems: 'center', width: '100%', marginTop: 8 },
  moreInfoText: { color: COLORS.pillText, fontSize: 12, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginTop: 20, marginBottom: 20 },
  detailsGrid: { flexDirection: 'column' },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between' },
  valueBold: { color: COLORS.valueBlack, fontSize: 15, fontWeight: '700' },
});