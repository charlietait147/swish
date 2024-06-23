import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CafeFilters from "@/components/cafe/CafeFilters";
import CafeList from "@/components/cafe/CafeList";

export default function DiscoverPage() {
    return ( 
        <>
        <Header />
        <CafeFilters />
        <CafeList />
        <Footer />
        </>
     );
}

