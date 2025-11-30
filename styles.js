import { StyleSheet } from 'react-native';

// Palette inspirée du design web (Shadcn/Tailwind)
const BackgroundColor = '#F3F4F6'; // Gris très clair pour le fond de l'app
const CardColor = '#FFFFFF';       // Blanc pour les cartes
const PrimaryColor = '#0F172A';    // Noir/Bleu nuit pour les textes et boutons principaux
const SecondaryColor = '#64748B';  // Gris pour les textes secondaires
const BorderColor = '#E2E8F0';     // Gris clair pour les bordures
const DangerColor = '#EF4444';     // Rouge pour supprimer

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    padding: 15,
  },
  // Style global pour les textes
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: PrimaryColor,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: SecondaryColor,
    marginBottom: 15,
  },
  
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

  // --- Boutons ---
  button: {
    backgroundColor: PrimaryColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  // Petit bouton contour (pour "Tout cocher", "Déconnexion" etc.)
  outlineButton: {
    backgroundColor: CardColor,
    borderColor: BorderColor,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  outlineButtonText: {
    color: PrimaryColor,
    fontSize: 12,
    fontWeight: '600',
  },

  // --- Cartes (Listes) ---
  border: { // Utilisé pour le conteneur de la liste
    flex: 1, 
    marginTop: 10
  },
  // Style d'une "Card" individuelle
  card: {
    backgroundColor: CardColor,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Ombre
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    borderColor: BorderColor,
    borderWidth: 1,
  },
  
  // --- Filtres (Pills) ---
  choixMultiple: {
    flexDirection: 'row',
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
    fontWeight: '600',
    color: PrimaryColor,
  },
  filterTextActive: {
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
  },

  // --- Layout Detail ---
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  actionsRow: {
    flexDirection: 'row',
  },
  
  // --- Divers ---
  progressBarContainer: {
    height: 4,
    backgroundColor: BorderColor,
    borderRadius: 2,
    marginVertical: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: PrimaryColor,
  },
  progressText: {
    fontSize: 12,
    color: SecondaryColor,
    marginTop: 2,
  },
  ErrorText: {
    color: DangerColor,
    marginBottom: 10,
    fontSize: 12,
  }
});