import { StyleSheet } from 'react-native';

const AntiFlashWithe = '#F0EDEE'
const MidNightGreen = '#07393C'
const CaribbeanCurrent = '#2C666E'
const Snow = '#FFFCFD'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AntiFlashWithe,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: MidNightGreen,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: MidNightGreen,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
    width: '85%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'bold',
  },
  choix: {
    backgroundColor: CaribbeanCurrent,
    width: '30%',
    aspectRatio: 1,
    marginBottom: 10, 
    borderRadius: 5, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  choixMultiple: {
    flex: 1, 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    padding: 10, 
  },
  progressBarContainer: {
    backgroundColor: MidNightGreen,
    borderRadius: 10,
    height: 20,
    overflow: 'hidden',
    width: '80%',
    margin: '10%',
  },
  progressBar: {
    backgroundColor: CaribbeanCurrent,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    position: 'absolute',
    align: 'center',
    color: 'white',
    fontSize: 12,
  },
  border: {
    borderColor: MidNightGreen,
    backgroundColor: Snow,
    borderWidth: 2,
    width: '100%',
    height: '50%',
  },
  deleteIcon: {
    alignItems: 'right',
    borderLeftColor: CaribbeanCurrent,
    borderLeftWidth: 1,
  },
  TodoLists: {
    borderBottonColor: CaribbeanCurrent,
    borderBottomWidth: 1,
    height: 25,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  ErrorText: {
    color: 'red',
  }

});
