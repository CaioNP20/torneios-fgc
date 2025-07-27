import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/ContactStyles'

const ContactScreen = () => {
  // Seus dados de contato
  const contactInfo = {
    email: 'caionp20.silva@gmail.com',
    linkedin: 'https://www.linkedin.com/in/caio-pinheiro-b1919b207/',
    github: 'https://github.com/CaioNP20',
    twitter: 'https://x.com/caio20silva',
  };

   const aboutMeText = `Olá! Me chamo Caio e sou um estudante de engenharia de computação. Tenho grande interesse em desenvolvimento com Python, SQL, mobile com React-Native e Inteligência Artificial. No momento, estou aceitando novos desafios profissionais e sempre disposto a somar em projetos relevantes.`;

  const handleLinkPress = (url) => {
    Linking.openURL(url).catch((err) => console.error('Não foi possível abrir o link:', err));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Entre em Contato</Text>

        {/* Seção Sobre Mim */}
        <View style={styles.card}>
          <Text style={styles.title}>Sobre Mim</Text>
          <Text style={styles.aboutText}>{aboutMeText}</Text>
        </View>

        {/* Seção de Contato */}
        <View style={styles.card}>
          <Text style={styles.title}>Conecte-se Comigo</Text>

          {/* Email */}
          <TouchableOpacity
            style={[styles.contactButton, styles.fullWidthButton]}
            onPress={() => handleLinkPress(`mailto:${contactInfo.email}`)}
          >
            <Icon name="envelope" size={20} color="#FFFFFF" />
            <Text style={styles.contactButtonText}>Email</Text>
          </TouchableOpacity>

          {/* LinkedIn */}
          <TouchableOpacity
            style={[styles.contactButton, styles.fullWidthButton]}
            onPress={() => handleLinkPress(contactInfo.linkedin)}
          >
            <Icon name="linkedin" size={20} color="#FFFFFF" />
            <Text style={styles.contactButtonText}>LinkedIn</Text>
          </TouchableOpacity>

          {/* GitHub */}
          <TouchableOpacity
            style={[styles.contactButton, styles.fullWidthButton]}
            onPress={() => handleLinkPress(contactInfo.github)}
          >
            <Icon name="github" size={20} color="#FFFFFF" />
            <Text style={styles.contactButtonText}>GitHub</Text>
          </TouchableOpacity>

          {/* Twitter/X */}
          <TouchableOpacity
            style={[styles.contactButton, styles.fullWidthButton]}
            onPress={() => handleLinkPress(contactInfo.twitter)}
          >
            <Icon name="twitter" size={20} color="#FFFFFF" />
            <Text style={styles.contactButtonText}>Twitter/X</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactScreen;
