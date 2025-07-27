import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import faqStyles from '../styles/FaqStyles';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FaqScreen = () => {
  const aboutAppText = `Este aplicativo foi criado para conectar jogadores a torneios de jogos de luta, tornando a busca e participação mais acessíveis. Pretendo adicionar mais jogos conforme forem lançados e em breve oferecer suporte a outros idiomas. Para qualquer dúvida, sinta-se à vontade para me contatar.`;

  const faqData = [
    {
      id: '1',
      question: 'De onde vêm os torneios exibidos no app?',
      answer: 'Todos os torneios são obtidos da plataforma Start.gg.',
    },
    {
      id: '2',
      question: 'O app mostra todos os torneios offline?',
      answer: 'Sim, todos os torneios offline cujo país corresponde ao selecionado na plataforma.',
    },
    {
      id: '3',
      question: 'O app mostra todos os torneios online?',
      answer: 'Não. Mostra apenas os que vão acontecer dentro de 7 dias, além disso, caso o dono do torneio seja de uma região diferente, pode não aparecer.',
    },
    {
      id: '4',
      question: 'Onde posso ver o código do app?',
      answer: (
        <Text>
          Você pode ver o código do app no Github:{' '}
          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/CaioNP20/torneios-fgc')}>
            <View style={faqStyles.linkContent}>
              <Text style={faqStyles.linkText}>https://github.com/CaioNP20/torneios-fgc</Text>
            </View>
          </TouchableOpacity>
        </Text>
      ),
    },
  ];

  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <SafeAreaView style={faqStyles.safeArea}>
      <ScrollView contentContainerStyle={faqStyles.container}>
        <Text style={faqStyles.header}>Dúvidas Frequentes</Text>

        {/* Seção Sobre o App */}
        <View style={faqStyles.card}>
          <Text style={faqStyles.title}>Sobre o App</Text>
          <Text style={faqStyles.aboutText}>{aboutAppText}</Text>
        </View>

        {/* Seção de Perguntas Frequentes */}
        <View style={faqStyles.card}>
          <Text style={faqStyles.title}>Perguntas Frequentes</Text>

          {faqData.map((item, index) => (
            <View key={item.id}>
              <TouchableOpacity
                style={[
                  faqStyles.faqQuestionContainer,
                  index === faqData.length - 1 && faqStyles.lastFaqItem, // Aplica estilo para o último item
                ]}
                onPress={() => toggleQuestion(item.id)}
              >
                <Text style={faqStyles.faqQuestionText}>{item.question}</Text>
                <Icon
                  name={expandedQuestion === item.id ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color="#666"
                />
              </TouchableOpacity>
              {expandedQuestion === item.id && (
                <View style={faqStyles.faqAnswerContainer}>
                  <Text style={faqStyles.faqAnswerText}>{item.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FaqScreen;
