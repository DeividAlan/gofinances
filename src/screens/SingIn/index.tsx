import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';

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
  const [isloading, setIsloading] = useState(false);

  const { singnInWithGoogle, singnInWithApple } = useAuth();
  const theme = useTheme();

  const handleSingnInWithGoogle = useCallback(async () => {

    try {
      setIsloading(true);
      return await singnInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta Google');
      setIsloading(false);
    }
  }, [singnInWithGoogle]);

  const handleSingnInWithApple = useCallback(async () => {
    try {
      setIsloading(true);
      return await singnInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta Apple');
      setIsloading(false);
    }
  }, [singnInWithApple]);

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
            onPress={handleSingnInWithApple}
          />
        </FooterWrapper>

        { isloading && 
          <ActivityIndicator 
            color={theme.colors.shape}
            style={{
              marginTop: 18
            }}
          />
        }
      </Footer>
    </Container>
  );
};