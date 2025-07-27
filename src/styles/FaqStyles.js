import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Fundo branco, consistente com a tela de contato
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginBottom: 25,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
    paddingBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 5,
    textAlign: 'justify'
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  // Estilos específicos para a seção de FAQ
  faqQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  faqQuestionText: {
    flex: 1, // Permite que o texto da pergunta ocupe o espaço restante
    fontSize: 17,
    fontWeight: '500',
    color: '#222',
  },
  faqAnswerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#f9f9f9', // Fundo levemente diferente para a resposta
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  faqAnswerText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
  lastFaqItem: {
    borderBottomWidth: 0, // Remove a borda do último item do FAQ
  },
});