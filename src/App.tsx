import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Download from '@/pages/Download';
import SsoWithoutPlatinum from '@/pages/why/SsoWithoutPlatinum';
import FlsDlsWithoutPlatinum from '@/pages/why/FlsDlsWithoutPlatinum';
import SecureKibanaEmbeds from '@/pages/why/SecureKibanaEmbeds';
import PlatinumOnBasicCloud from '@/pages/why/PlatinumOnBasicCloud';
import AuditCompliance from '@/pages/why/AuditCompliance';
import DevSecOpsAclTesting from '@/pages/why/DevSecOpsAclTesting';
import FipsCompliance from '@/pages/why/FipsCompliance';
import Privacy from '@/pages/legal/Privacy';
import Terms from '@/pages/legal/Terms';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/download" element={<Download />} />
          <Route path="/why/sso-without-platinum" element={<SsoWithoutPlatinum />} />
          <Route path="/why/fls-dls-without-platinum" element={<FlsDlsWithoutPlatinum />} />
          <Route path="/why/secure-kibana-embeds" element={<SecureKibanaEmbeds />} />
          <Route path="/why/platinum-on-basic-cloud" element={<PlatinumOnBasicCloud />} />
          <Route path="/why/audit-compliance" element={<AuditCompliance />} />
          <Route path="/why/devsecops-acl-testing" element={<DevSecOpsAclTesting />} />
          <Route path="/why/fips-compliance" element={<FipsCompliance />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
