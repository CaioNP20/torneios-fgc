import { StyleSheet } from 'react-native';

export default StyleSheet.create({
      safeArea: {
        flex: 1,
        backgroundColor: '#fff',
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
        textAlign: 'justify',
      },
      contactButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      contactButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        marginLeft: 10,
      },
      fullWidthButton: {
        width: '100%',
      },
});