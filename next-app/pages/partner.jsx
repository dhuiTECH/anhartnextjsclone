import dynamic from 'next/dynamic';

const Partner = dynamic(() => import('../src/components/Partner'), { ssr: false });

export default function PartnerPage() {
  return <Partner />;
}
