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

// DADOS
export const TICKETS_DATA = [
  {
    id: '6',
    eventTitle: "BAD BUNNY: DeBÍ TiRAR MáS FOToS World Tour",
    subTitle: "20/02/2026 • Allianz Parque, São Paulo",
    venue: "SÃO PAULO, BRASIL | Allianz Parque",
    countText: "2 Ingressos",
    ticketQuantity: 2,
    dateText: "Sex 20 21:00",
    image: "https://cdn.getcrowder.com/images/bebfda30-5715-45da-92aa-9fc51cd39333-badbunny1920x720foto.gif",
    sortDate: "2026-02-20",
    fullDate: "20/02/2026",
    section: "Pista",
    gate: "Portão B",
    rowInfo: "Não numerado",
    open: "16:00",
    start: "21:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 537,50", qrCodeBase: "BB-SP-PISTA-M" },
      { priceInfo: "Inteira - R$ 1.075,00", qrCodeBase: "BB-SP-PISTA-I" }
    ]
  },
  {
    id: '7',
    eventTitle: "BAD BUNNY: DeBÍ TiRAR MáS FOToS World Tour",
    subTitle: "20/02/2026 • Allianz Parque, São Paulo",
    venue: "SÃO PAULO, BRASIL | Allianz Parque",
    countText: "2 Ingressos",
    ticketQuantity: 2,
    dateText: "Sex 20 21:00",
    image: "https://cdn.getcrowder.com/images/bebfda30-5715-45da-92aa-9fc51cd39333-badbunny1920x720foto.gif",
    sortDate: "2026-02-20",
    fullDate: "20/02/2026",
    section: "Cadeira Inferior",
    gate: "Portão C",
    rowInfo: "Não numerado",
    open: "16:00",
    start: "21:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 547,50", qrCodeBase: "BB-SP-CADINF-M" },
      { priceInfo: "Inteira - R$ 1.095,00", qrCodeBase: "BB-SP-CADINF-I" }
    ]
  },
  {
    id: '8',
    eventTitle: "BAD BUNNY: DeBÍ TiRAR MáS FOToS World Tour",
    subTitle: "20/02/2026 • Allianz Parque, São Paulo",
    venue: "SÃO PAULO, BRASIL | Allianz Parque",
    countText: "2 Ingressos",
    ticketQuantity: 2,
    dateText: "Sex 20 21:00",
    image: "https://cdn.getcrowder.com/images/bebfda30-5715-45da-92aa-9fc51cd39333-badbunny1920x720foto.gif",
    sortDate: "2026-02-20",
    fullDate: "20/02/2026",
    section: "Cadeira Superior",
    gate: "Portão D",
    rowInfo: "Não numerado",
    open: "16:00",
    start: "21:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 397,50", qrCodeBase: "BB-SP-CADSUP-M" },
      { priceInfo: "Inteira - R$ 795,00", qrCodeBase: "BB-SP-CADSUP-I" }
    ]
  },
  {
    id: '1',
    eventTitle: "OASIS: LIVE '25",
    subTitle: "22/11/2025 • Estádio Morumbi, São Paulo",
    venue: "SÃO PAULO, BRASIL | Estádio Morumbi",
    countText: "2 Ingressos",
    ticketQuantity: 2,
    dateText: "Sáb 22 21:00",
    image: "https://i.imgur.com/1bX5QH6.jpeg",
    sortDate: "2025-11-22",
    fullDate: "22/11/2025",
    monthLabel: "Novembro 2025",
    section: "Pista",
    gate: "Portão B",
    rowInfo: "Não numerado",
    open: "17:00",
    start: "21:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 490,00", qrCodeBase: "OASIS-SP-PISTA-M" },
      { priceInfo: "Inteira - R$ 980,00", qrCodeBase: "OASIS-SP-PISTA-I" }
    ]
  },
  {
    id: '2',
    eventTitle: "SHAKIRA",
    subTitle: "14/02/2025 • Estádio Morumbi, São Paulo",
    venue: "SÃO PAULO, BRASIL | Estádio Morumbi",
    countText: "2 Ingressos",
    ticketQuantity: 2,
    dateText: "Sex 14 21:00",
    image: "https://i.imgur.com/8Rm6AQJ.jpeg",
    sortDate: "2025-02-14",
    fullDate: "14/02/2025",
    monthLabel: "Fevereiro 2025",
    section: "Pista",
    gate: "Portão A",
    rowInfo: "Não numerado",
    open: "17:00",
    start: "21:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 375,00", qrCodeBase: "SHAKIRA-SP-PISTA-M" },
      { priceInfo: "Inteira - R$ 750,00", qrCodeBase: "SHAKIRA-SP-PISTA-I" }
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