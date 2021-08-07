import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';

import { SingInSocialButton } from '../../components/SignInSocialButton';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles';

export function SingIn(){
  const { singnInWithGoogle } = useAuth();

  const handleSingnInWithGoogle = useCallback(async () => {

    try {
      await singnInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta google');
    }
  }, [singnInWithGoogle]);

  return(
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SingInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSingnInWithGoogle}
          />

          <SingInSocialButton
            title="Entrar com Apple"
            svg={AppleSvg}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
};