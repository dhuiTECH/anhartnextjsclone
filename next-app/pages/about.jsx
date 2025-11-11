import dynamic from 'next/dynamic';

const About = dynamic(() => import('../src/components/About'), { ssr: false });

export default function AboutPage() {
  return <About />;
}
