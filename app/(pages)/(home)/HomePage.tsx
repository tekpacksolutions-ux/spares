import {
  AboutSection,
  CategorySection,
  ContactSection,
  FeatureSection,
  FooterSection,
  LandingSection,
  NavigationSection,
  ProductSection,
} from './section';

export default function HomePage() {
  return (
    <section>
      <NavigationSection />
      <LandingSection />
      <AboutSection />
      <CategorySection />
      <ProductSection />
      <FeatureSection />
      <ContactSection />
      <FooterSection />
    </section>
  );
}
