import { StyleSheet, Platform } from "react-native";

// Palette inspirée du design web (Shadcn/Tailwind)
const BackgroundColor = "#F3F4F6"; // Gris très clair pour le fond de l'app
const CardColor = "#FFFFFF"; // Blanc pour les cartes
const PrimaryColor = "#0F172A"; // Noir/Bleu nuit pour les textes et boutons principaux
const SecondaryColor = "#64748B"; // Gris pour les textes secondaires
const BorderColor = "#E2E8F0"; // Gris clair pour les bordures
const DangerColor = "#EF4444"; // Rouge pour supprimer

const cardShadow = Platform.select({
  web: { boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)" },
  default: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
});

const authCardShadow = Platform.select({
  web: { boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" },
  default: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    padding: 15,
  },
  centeredContainer: {
    justifyContent: "center",
  },
  // Style global pour les textes
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: PrimaryColor,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: SecondaryColor,
    marginBottom: 15,
  },
  subText: {
    fontSize: 14,
    color: SecondaryColor,
    marginBottom: 10,
  },
  bodyText: {
    color: "#334155",
    lineHeight: 22,
  },
  secondaryText: {
    color: SecondaryColor,
  },
  linkText: {
    color: PrimaryColor,
    fontWeight: "bold",
  },
  textCenter: {
    textAlign: "center",
  },

  // Spacing
  mb15: { marginBottom: 15 },
  mb20: { marginBottom: 20 },
  mt20: { marginTop: 20 },

  // --- Inputs ---
  input: {
    backgroundColor: CardColor,
    height: 50,
    borderRadius: 8,
    borderColor: BorderColor,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  inputInline: {
    flex: 1,
    marginBottom: 0,
  },
  inputLabel: {
    fontSize: 14,
    color: SecondaryColor, // #64748B - gris moyen
    fontWeight: "500",
    marginBottom: 5,
  },

  // --- Boutons ---
  button: {
    backgroundColor: PrimaryColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  buttonCompact: {
    marginVertical: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonNarrow: {
    width: 80,
    marginVertical: 0,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonDanger: {
    backgroundColor: DangerColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
  },
  // Petit bouton contour (pour "Tout cocher", "Déconnexion" etc.)
  outlineButton: {
    backgroundColor: CardColor,
    borderColor: BorderColor,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 5,
  },
  outlineButtonText: {
    color: PrimaryColor,
    fontSize: 12,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.7,
  },

  // --- Cartes (Listes) ---
  border: {
    // Utilisé pour le conteneur de la liste
    flex: 1,
    marginTop: 10,
  },
  // Style d'une "Card" individuelle
  card: {
    backgroundColor: CardColor,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: BorderColor,
    borderWidth: 1,
    ...cardShadow,
  },
  authCard: {
    backgroundColor: CardColor,
    borderRadius: 12,
    padding: 25,
    width: "100%",
    borderColor: BorderColor,
    borderWidth: 1,
    ...authCardShadow,
  },
  surfaceCard: {
    backgroundColor: CardColor,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderColor: BorderColor,
    borderWidth: 1,
  },
  listItemContainer: {
    backgroundColor: CardColor,
    borderBottomWidth: 1,
    borderBottomColor: BorderColor,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  // --- Filtres (Pills) ---
  choixMultiple: {
    flexDirection: "row",
    marginVertical: 15,
    gap: 10,
  },
  filterPill: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20, // Forme de pillule
    backgroundColor: CardColor,
    borderWidth: 1,
    borderColor: BorderColor,
  },
  filterPillActive: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: PrimaryColor, // Fond noir si actif
    borderWidth: 1,
    borderColor: PrimaryColor,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: PrimaryColor,
  },
  filterTextActive: {
    fontSize: 13,
    fontWeight: "600",
    color: "white",
  },

  // --- Layout Detail ---
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerRowTop: {
    alignItems: "flex-start",
  },
  actionsRow: {
    flexDirection: "row",
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  inlineRowGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flex1: {
    flex: 1,
  },
  switchAuthRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },

  // --- Divers ---
  progressBarContainer: {
    height: 4,
    backgroundColor: BorderColor,
    borderRadius: 2,
    marginVertical: 10,
    overflow: "hidden",
  },
  progressSection: {
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  progressBar: {
    height: "100%",
    backgroundColor: PrimaryColor,
  },
  progressText: {
    fontSize: 12,
    color: SecondaryColor,
    marginTop: 2,
  },
  statsText: {
    fontSize: 12,
    color: SecondaryColor,
  },

  // --- Erreurs ---
  ErrorText: {
    color: DangerColor,
    marginBottom: 10,
    fontSize: 12,
  },

  // --- Navigation ---
  sectionLabel: {
    fontWeight: "500",
    marginBottom: 10,
    color: PrimaryColor,
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backIcon: {
    fontSize: 20,
    marginRight: 5,
    color: PrimaryColor,
  },
  backLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: PrimaryColor,
  },
  listContentPadding: {
    paddingBottom: 50,
  },
  todoListItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    color: "#334155",
  },
  iconButton: {
    marginLeft: 15,
    padding: 4,
  },
  iconSmall: {
    height: 24,
    width: 24,
  },

  // --- Header ---
  headerStyle: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: BorderColor,
  },
  headerTitleStyle: {
    fontWeight: "bold",
    color: PrimaryColor,
  },
  headerActionButton: {
    marginRight: 15,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#F1F5F9",
  },
  headerActionText: {
    color: PrimaryColor,
    fontSize: 12,
    fontWeight: "600",
  },
});
