import { StyleSheet } from 'react-native';

// palette de couleurs
const BackgroundColor = '#F3F4F6'; // Gris très clair
const CardColor = '#FFFFFF';       // Blanc pur
const PrimaryColor = '#0F172A';    // Bleu nuit 
const SecondaryColor = '#64748B';  // Gris moyen 
const DangerColor = '#EF4444';     // Rouge 

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    padding: 20, // marge intérieure
  },
  // Le style "Card" 
  border: {
    backgroundColor: CardColor,
    borderRadius: 12, // Coins arrondis 
    padding: 15,
    marginBottom: 15,
    // Ombre portée (Shadow) 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Input 
  input: {
    backgroundColor: CardColor,
    height: 50,
    borderRadius: 8,
    borderColor: '#E2E8F0',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  // Bouton principal
  button: {
    backgroundColor: PrimaryColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Pour les listes d'items
  TodoLists: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#F1F5F9',
    borderBottomWidth: 1,
  },
  deleteIcon: {
    padding: 8,
  },
  // Titres
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PrimaryColor,
    marginBottom: 20,
  },
  subText: {
    color: SecondaryColor,
    fontSize: 14,
    marginBottom: 20,
  },
  // Progress Bar
  progressBarContainer: {
    backgroundColor: '#E2E8F0',
    borderRadius: 99, 
    height: 10,
    width: '100%',
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    backgroundColor: PrimaryColor,
    height: '100%',
  },
  // Filtres (Choix)
  choixMultiple: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 15,
  },
  choix: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  choixText: {
     color: PrimaryColor,
     fontSize: 12,
     fontWeight: '600'
  },
  ErrorText: {
    color: DangerColor,
    marginBottom: 10,
  }
});