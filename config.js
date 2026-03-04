// src/config.js
import { StyleSheet, Dimensions, Platform } from 'react-native';

// AJUSTES DE TELA
const windowWidth = Dimensions.get('window').width;
export const width = Platform.OS === 'web' && windowWidth > 500 ? 400 : windowWidth;
export const CARD_WIDTH = width * 0.90; // Reduzido mais para espaçamento visível
export const QR_SIZE = 125; // Aumentado conforme referência

// CONFIGURAÇÃO GERAL
export const BACKGROUND_URL = "https://i.postimg.cc/XYj9d0Gn/Design-sem-nome.png";
export const TM_LOGO_URL = "https://i.postimg.cc/XYj9d0Gn/Design-sem-nome.png";

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
    id: 'acdc-arquibancada',
    eventTitle: "AC/DC: Pwr Up Tour",
    subTitle: "04/03/2026 • Estádio Morumbi, São Paulo",
    venue: "Estádio Morumbi",
    countText: "2 Ingressos",
    ticketQuantity: 2,
    dateText: "Qua 04 21:00",
    image: require('./assets/acdc.jpg'),
    sortDate: "2026-03-04",
    fullDate: "04/03/2026",
    section: "Arquibancada",
    gate: "PORTÃO 06 e 15",
    rowInfo: "Não numerado",
    open: "17:00",
    start: "21:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 425,00", qrCodeBase: "ACDC-SP-ARQ-M1" },
      { priceInfo: "Inteira - R$ 850,00", qrCodeBase: "ACDC-SP-ARQ-I1" }
    ]
  },
  {
    id: 'acdc-inferior',
    eventTitle: "AC/DC: Pwr Up Tour",
    subTitle: "04/03/2026 • Estádio Morumbi, São Paulo",
    venue: "Estádio Morumbi",
    countText: "2 Ingressos",
    ticketQuantity: 2,
    dateText: "Qua 04 21:00",
    image: require('./assets/acdc.jpg'),
    sortDate: "2026-03-04",
    fullDate: "04/03/2026",
    section: "Cadeira Inferior",
    gate: "PORTÃO 17A e 17B",
    rowInfo: "Não numerado",
    open: "17:00",
    start: "21:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 795,00", qrCodeBase: "ACDC-SP-INF-M1" },
      { priceInfo: "Inteira - R$ 1.590,00", qrCodeBase: "ACDC-SP-INF-I1" }
    ]
  },
  {
    id: 'acdc-superior',
    eventTitle: "AC/DC: Pwr Up Tour",
    subTitle: "04/03/2026 • Estádio Morumbi, São Paulo",
    venue: "Estádio Morumbi",
    countText: "2 Ingressos",
    ticketQuantity: 2,
    dateText: "Qua 04 21:00",
    image: require('./assets/acdc.jpg'),
    sortDate: "2026-03-04",
    fullDate: "04/03/2026",
    section: "Cadeira Superior",
    gate: "PORTÃO 16",
    rowInfo: "Não numerado",
    open: "17:00",
    start: "21:00",
    ticketsList: [
      { priceInfo: "Meia - R$ 745,00", qrCodeBase: "ACDC-SP-SUP-M1" },
      { priceInfo: "Inteira - R$ 1.490,00", qrCodeBase: "ACDC-SP-SUP-I1" }
    ]
  },
  {
    id: '8',
    eventTitle: "BAD BUNNY: DeBÍ TiRAR MáS FOToS World Tour",
    subTitle: "21/02/2026 • Allianz Parque, São Paulo",
    venue: "SÃO PAULO, BRASIL | Allianz Parque",
    countText: "4 Ingressos",
    ticketQuantity: 4,
    dateText: "Sáb 21 21:00",
    image: "https://cdn.getcrowder.com/images/bebfda30-5715-45da-92aa-9fc51cd39333-badbunny1920x720foto.gif",
    sortDate: "2026-02-21",
    fullDate: "21/02/2026",
    section: "Cadeira Superior",
    gate: "Portão A",
    rowInfo: "Não numerado",
    open: "17:00",
    start: "21:00",
    ticketsList: [
      { priceInfo: "Inteira - R$ 1.350,00", qrCodeBase: "ACDC-SP-PISTAA-I1" },
      { priceInfo: "Inteira - R$ 1.350,00", qrCodeBase: "ACDC-SP-PISTAA-I2" }
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
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
    touchAction: 'none',       // Bloqueia interações do sistema (zoom/scroll nativo) para controle total
    userSelect: 'none',        // Previne seleção de texto acidental
    overscrollBehavior: 'none' // Impede o "puxar para recarregar" do navegador
  },
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
  detailNavBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, backgroundColor: COLORS.bg, borderBottomWidth: 1, borderBottomColor: '#222' },
  navTitle: { color: '#fff', fontSize: 15, fontWeight: '700', marginBottom: 2 },
  navSub: { color: '#888', fontSize: 11, fontWeight: '500', marginTop: 4, flexShrink: 1 },
  paginationContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 20 },
  paginationDot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  dotActive: { backgroundColor: COLORS.dotActive },
  dotInactive: { backgroundColor: COLORS.dotInactive },
  carouselContainer: { width: width, alignItems: 'center' },
  ticketCardContainer: { width: CARD_WIDTH, marginTop: 0, paddingVertical: 10 },
  blueHeaderContainer: { position: 'relative', height: 330, width: '100%', backgroundColor: '#0149D2', borderTopLeftRadius: 8, borderTopRightRadius: 8, overflow: 'hidden', },
  ticketBlueTop: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  scannerStrip: { height: 2, width: '100%', backgroundColor: 'rgba(0, 255, 255, 0.05)', overflow: 'hidden', position: 'absolute', bottom: 0 },
  scannerBar: { height: '100%', backgroundColor: COLORS.cyanBar, shadowColor: COLORS.cyanBar, shadowOpacity: 0.8, shadowRadius: 3 },
  ticketBoxTop: { padding: 20, backgroundColor: COLORS.white, borderBottomLeftRadius: 2, borderBottomRightRadius: 2, marginBottom: 1, paddingBottom: 22 },
  ticketBoxBottom: { paddingHorizontal: 20, paddingVertical: 22, backgroundColor: COLORS.white, borderRadius: 8, borderTopLeftRadius: 2, borderTopRightRadius: 2 },
  qrSection: { flexDirection: 'row', alignItems: 'center' },
  qrContainer: { paddingTop: 0, paddingRight: 5 },
  qrInfoColumn: { flex: 1, marginLeft: 15, justifyContent: 'center', },
  label: { color: COLORS.labelGrey, fontSize: 8.5, fontWeight: '700', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 1.1 },
  valueTitle: { color: COLORS.valueBlack, fontSize: 16, fontWeight: '700', lineHeight: 21, marginBottom: 5 },
  moreInfoBtn: { backgroundColor: '#F0F9FF', paddingVertical: 11, borderRadius: 8, alignItems: 'center', width: '100%', marginTop: 8 },
  moreInfoText: { color: '#0070E0', fontSize: 12.5, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#F6F6F6', marginVertical: 20 },
  detailsGrid: { flexDirection: 'column' },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between' },
  valueBold: { color: COLORS.valueBlack, fontSize: 16.5, fontWeight: '700' },
});