// src/config.js
import { StyleSheet, Dimensions, Platform } from 'react-native';

// AJUSTES DE TELA
const windowWidth = Dimensions.get('window').width;
export const width = Platform.OS === 'web' && windowWidth > 500 ? 400 : windowWidth;
export const CARD_WIDTH = width * 0.94;
export const QR_SIZE = 110;

// CONFIGURAÇÃO GERAL
export const BACKGROUND_URL = "https://images.tcdn.com.br/img/editor/up/1113098/ticket.jpg";
export const TM_LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ticketmaster_logo.svg/1024px-Ticketmaster_logo.svg.png";

// CORES
export const COLORS = {
  bg: '#121618',
  blueHeader: '#0026b9',
  cyanBar: '#00E5FF',
  labelGrey: '#888888',
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
    id: '9',
    eventTitle: "BAD BUNNY: DeBÍ TiRAR MáS FOToS World Tour",
    subTitle: "20/02/2026 • Allianz Parque, São Paulo",
    venue: "SÃO PAULO, BRASIL | Allianz Parque",
    countText: "4 Ingressos",
    ticketQuantity: 4,
    dateText: "Sex 20 21:00",
    image: "https://cdn.getcrowder.com/images/bebfda30-5715-45da-92aa-9fc51cd39333-badbunny1920x720foto.gif",
    sortDate: "2026-02-20",
    fullDate: "20/02/2026",
    section: "Pista Premium",
    gate: "Portão A",
    rowInfo: "Não numerado",
    open: "16:00",
    start: "21:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 747,50", qrCodeBase: "BB-SP-PREMIUM-M1" },
      { priceInfo: "Meia - R$ 747,50", qrCodeBase: "BB-SP-PREMIUM-M2" },
      { priceInfo: "Inteira - R$ 1.495,00", qrCodeBase: "BB-SP-PREMIUM-I1" },
      { priceInfo: "Inteira - R$ 1.495,00", qrCodeBase: "BB-SP-PREMIUM-I2" }
    ]
  },
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
    countText: "4 Ingressos",
    ticketQuantity: 4,
    dateText: "Sex 20 21:00",
    image: "https://cdn.getcrowder.com/images/bebfda30-5715-45da-92aa-9fc51cd39333-badbunny1920x720foto.gif",
    sortDate: "2026-02-20",
    fullDate: "20/02/2026",
    section: "Cadeira Inferior",
    gate: "Portões A, C e D",
    rowInfo: "Não numerado",
    open: "16:00",
    start: "21:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 547,50", qrCodeBase: "BB-SP-CADINF-M1" },
      { priceInfo: "Meia - R$ 547,50", qrCodeBase: "BB-SP-CADINF-M2" },
      { priceInfo: "Inteira - R$ 1.095,00", qrCodeBase: "BB-SP-CADINF-I1" },
      { priceInfo: "Inteira - R$ 1.095,00", qrCodeBase: "BB-SP-CADINF-I2" }
    ]
  },
  {
    id: '8',
    eventTitle: "BAD BUNNY: DeBÍ TiRAR MáS FOToS World Tour",
    subTitle: "20/02/2026 • Allianz Parque, São Paulo",
    venue: "SÃO PAULO, BRASIL | Allianz Parque",
    countText: "4 Ingressos",
    ticketQuantity: 4,
    dateText: "Sex 20 21:00",
    image: "https://cdn.getcrowder.com/images/bebfda30-5715-45da-92aa-9fc51cd39333-badbunny1920x720foto.gif",
    sortDate: "2026-02-20",
    fullDate: "20/02/2026",
    section: "Cadeira Superior",
    gate: "Portão B",
    rowInfo: "Não numerado",
    open: "16:00",
    start: "21:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 397,50", qrCodeBase: "BB-SP-CADSUP-M1" },
      { priceInfo: "Meia - R$ 397,50", qrCodeBase: "BB-SP-CADSUP-M2" },
      { priceInfo: "Inteira - R$ 795,00", qrCodeBase: "BB-SP-CADSUP-I1" },
      { priceInfo: "Inteira - R$ 795,00", qrCodeBase: "BB-SP-CADSUP-I2" }
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
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Poster_for_Oasis_Live_%2725_Tour.jpg/250px-Poster_for_Oasis_Live_%2725_Tour.jpg",
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
    image: "https://www.billboard.com/wp-content/uploads/2025/02/shakira-las-mujeres-world-tour-rio-de-janeiro-02-2025-billboard-1548.jpg?w=942&h=628&crop=1",
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
  tabText: { fontWeight: '600', fontSize: 13 },
  textActive: { color: '#000000' },
  textInactive: { color: COLORS.greyText },
  typeBanner: { backgroundColor: 'rgba(0,0,0,0.15)', paddingVertical: 8, alignItems: 'center', width: '100%', position: 'absolute', top: 0, zIndex: 10 },
  typeBannerText: { color: '#fff', fontSize: 13, fontWeight: '800', letterSpacing: 1 },
  sectionTitle: { color: '#ddd', fontSize: 15, fontWeight: 'bold', marginLeft: 20, marginTop: 10, marginBottom: 10 },
  listCard: { backgroundColor: COLORS.cardBg, flexDirection: 'row', marginHorizontal: 20, marginBottom: 12, borderRadius: 8, height: 105, overflow: 'hidden' },
  listCardImage: { width: 105, height: '100%' },
  listCardInfo: { flex: 1, justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 10 },
  listTopLine: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  listCount: { color: COLORS.teal, fontSize: 13, fontWeight: '600' },
  listDate: { color: COLORS.greyText, fontSize: 13, fontWeight: '400' },
  listTitle: { color: COLORS.white, fontSize: 15, fontWeight: '600', marginBottom: 3 },
  listVenue: { color: COLORS.greyText, fontSize: 13, fontWeight: '400' },
  detailContainer: { flex: 1, backgroundColor: '#121212', alignItems: Platform.OS === 'web' ? 'center' : 'stretch' },
  detailNavBar: { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingBottom: 15, paddingHorizontal: 20, zIndex: 100, backgroundColor: '#121212', width: Platform.OS === 'web' ? width : '100%', },
  navTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginLeft: 10, flexShrink: 1 },
  navSub: { color: '#bbb', fontSize: 13, marginLeft: 10, marginTop: 4, flexShrink: 1 },
  paginationContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 20 },
  paginationDot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  dotActive: { backgroundColor: COLORS.dotActive },
  dotInactive: { backgroundColor: COLORS.dotInactive },
  carouselContainer: { width: width, alignItems: 'center' },
  ticketCardContainer: { width: CARD_WIDTH, marginTop: 10, paddingVertical: 10 },
  blueHeaderContainer: { position: 'relative', height: 200, width: '100%', backgroundColor: COLORS.blueHeader, borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: 'hidden', },
  ticketBlueTop: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 10 },
  scannerStrip: { height: 5, width: '100%', backgroundColor: 'rgba(0, 255, 255, 0.05)', overflow: 'hidden', position: 'absolute', bottom: 0 },
  scannerBar: { height: '100%', backgroundColor: COLORS.cyanBar, shadowColor: COLORS.cyanBar, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 3 },
  ticketBoxTop: { padding: 20, backgroundColor: COLORS.white, borderBottomLeftRadius: 16, borderBottomRightRadius: 16, marginBottom: 12, paddingBottom: 25 },
  ticketBoxBottom: { paddingHorizontal: 20, paddingVertical: 22, backgroundColor: COLORS.white, borderRadius: 16 },
  qrSection: { flexDirection: 'row', alignItems: 'center' },
  qrContainer: { paddingTop: 0, paddingRight: 5 },
  qrInfoColumn: { flex: 1, marginLeft: 15, justifyContent: 'center', },
  label: { color: COLORS.labelGrey, fontSize: 8, fontWeight: '600', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.8 },
  valueTitle: { color: COLORS.valueBlack, fontSize: 16, fontWeight: '700', lineHeight: 21, marginBottom: 5 },
  moreInfoBtn: { backgroundColor: '#EBF8FF', paddingVertical: 10, borderRadius: 10, alignItems: 'center', width: '100%', marginTop: 8 },
  moreInfoText: { color: '#0070E0', fontSize: 12, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#F6F6F6', marginVertical: 20 },
  detailsGrid: { flexDirection: 'column' },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between' },
  valueBold: { color: COLORS.valueBlack, fontSize: 16.5, fontWeight: '700' },
});