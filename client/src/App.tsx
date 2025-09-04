import './App.css'
import 'leaflet/dist/leaflet.css';
import Sidebar from "@/components/Sidebar.tsx";
import {useEffect, useState} from "react";
import { FilterX, SidebarIcon} from "lucide-react";
import TextSummaryCard from "@/components/TextSummaryCard.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import TableCard from "@/components/TableCard.tsx";
import PieChartCard from "@/components/PieChartCard.tsx";
import BarChartCard from "@/components/BarChartCard.tsx";
import {
    fetchNationalTotals,
    fetchAllProvinces,
    fetchProvince,
    fetchProvinceCities,
} from "./api/api.ts";
import type {
    NationalTotals,
    ProvinceTotals,
    CityTotals,
} from "./api/apiTypes.ts";
import MapCard from "@/components/MapCard.tsx";
import {findProvinceName} from "@/lib/provincesCode.ts";
import {Button} from "@/components/ui/button.tsx";


function App() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("");

    const [national, setNational] = useState<NationalTotals | null>(null);
    const [provinces, setProvinces] = useState<ProvinceTotals[]>([]);
    const [provinceData, setProvinceData] = useState<ProvinceTotals | null>(null);
    const [cities, setCities] = useState<CityTotals[]>([]);

    useEffect(() => {
        (async () => {
            const [nat, provs] = await Promise.all([
                fetchNationalTotals(),
                fetchAllProvinces(),
            ]);
            setNational(nat);
            setProvinces(provs);
        })();
    }, []);


    function resetProvince(){
        setSelectedProvinceCode("");
        setProvinceData(null);
        setCities([])
    }


    async function handleSelectProvince(code: string) {
        setSelectedProvinceCode(code);

        try {
            const province = await fetchProvince(code);
            setProvinceData(province);
            const citiesData = await fetchProvinceCities(code);
            setCities(citiesData);
        } catch (error) {
            console.error("Failed to fetch province data:", error);
        }
    }

  return (
      <section className="w-screen h-screen flex">
          <Sidebar open={isSidebarOpen}/>
          <ScrollArea className="w-full">
              <div id={"content"} className={"w-full"}>

                  <div id="topbar"
                       className="sticky pl-4 bg-white top-0 w-full border-b h-16 items-center flex px-4 z-10">

                      <div className="rounded-sm hover:bg-gray-100 hover:cursor-pointer p-1 "
                           onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                          <SidebarIcon size={20}/>
                      </div>
                  </div>

                  <div id="cards" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-8 p-4">

                      <div className="w-full col-span-1 md:col-span-2 xl:col-span-3">
                          <MapCard selectProvinceHandler={handleSelectProvince}/>
                      </div>

                      <div className="w-full col-span-1 md:col-span-2 xl:col-span-3">
                          <TextSummaryCard
                              province={findProvinceName(selectedProvinceCode)}
                              AmountPAUD={provinceData ? provinceData?.jmlPaud : national?.jmlPaud}
                              AmountSD={provinceData ? provinceData?.jmlSd : national?.jmlSd}
                              AmountSMP={provinceData ? provinceData?.jmlSmp : national?.jmlSmp}
                              AmountSMA={provinceData ? provinceData?.jmlSma : national?.jmlSma}
                              BudgetPAUD={provinceData ? provinceData?.anggaranPaud : national?.anggaranPaud}
                              BudgetSD={provinceData ? provinceData?.anggaranSd : national?.anggaranSd}
                              BudgetSMP={provinceData ? provinceData?.anggaranSmp : national?.anggaranSmp}
                              BudgetSMA={provinceData ? provinceData?.anggaranSma : national?.anggaranSma}
                          />
                      </div>

                      <div className="w-full col-span-1 md:col-span-2 xl:col-span-4">
                          <TableCard data={cities.length!=0? cities : provinces}/>
                      </div>

                      <div className="w-full col-span-1 md:col-span-2 xl:col-span-2">
                          {national && (
                              <PieChartCard
                                  PAUD={provinceData ? provinceData.anggaranPaud : national?.anggaranPaud}
                                  SD={provinceData ? provinceData.anggaranSd : national?.anggaranSd}
                                  SMP={provinceData ? provinceData.anggaranSmp : national?.anggaranSmp}
                                  SMA={provinceData ? provinceData.anggaranSma : national?.anggaranSma}
                                  province={findProvinceName(selectedProvinceCode)}
                              />

                          )}
                      </div>

                      <div className="w-full col-span-1 md:col-span-2 xl:col-span-6">
                          <BarChartCard data={cities.length!=0 ? cities : provinces} province={findProvinceName(selectedProvinceCode)}/>
                      </div>
                  </div>
              </div>
          </ScrollArea>
          {selectedProvinceCode && <div className={"flex flex-col fixed top-4 right-4 rounded-xl border bg-white shadow p-6 z-20"}>
              <p>Provinsi Terpilih :</p>
              <p className={"font-semibold"}>{findProvinceName(selectedProvinceCode)}</p>
              <Button className={"text-red-600 w-60 mt-4"} onClick={() => resetProvince() }><FilterX/>Reset
                  Filter</Button>
          </div>}

      </section>
  )
}

export default App
