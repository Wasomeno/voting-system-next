import {
  AppContainer,
  AppTitle,
} from "../../styles/styled-components/app/appHomeComponents";

export default function AppHome() {
  return (
    <AppContainer>
      <AppTitle>Welcome to the Entrance</AppTitle>
      <video width="320" height="240" autoPlay muted loop>
        <source src="/vote-hero.mp4" type="video/mp4" />
      </video>
    </AppContainer>
  );
}
