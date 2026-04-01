import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { useActiveId, useJobItem, useJobItems } from "../lib/hooks";
import { BASE_API_URL } from "../lib/constants";

function App() {

const [searchText, setSearchText] = useState<string>("")
const [jobItems, isLoading, totalNumberOfResults ] = useJobItems(searchText)
const activeId = useActiveId()
const jobItem = useJobItem(activeId)


useEffect(() => {

  if (!activeId) return

  const fetchData = async  () => {
    const response = await fetch(`${BASE_API_URL}/${activeId}`)
    const data =  await response.json()
    setJobItem(data.jobItem)
  }

  fetchData()


}, [activeId])

  return (
  <>
  <Background /> 

  <Header>
    <HeaderTop>
      <Logo /> 
      <BookmarksButton />
    </HeaderTop>
  

    <SearchForm searchText={searchText} setSearchText={setSearchText} />
  </Header>

  <Container>
    <Sidebar>
      <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} /> 
            <SortingControls />
      </SidebarTop>
        
    
          <JobList jobItems={jobItems} isLoading={isLoading} /> 
          <PaginationControls /></Sidebar>
    <JobItemContent jobItem={jobItem} />
  </Container>

  <Footer />
  
  </>
)}

export default App;
