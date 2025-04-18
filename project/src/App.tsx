import { ThemeProvider } from '@/components/theme-provider';
import Layout from '@/components/layout';
import HomePage from '@/sections/home';
import AboutSection from '@/sections/about';
import DemoSection from '@/sections/demo';
import TeamSection from '@/sections/team';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Layout>
        <HomePage />
        <AboutSection />
        <DemoSection />
        <TeamSection />
      </Layout>
    </ThemeProvider>
  );
}

export default App;