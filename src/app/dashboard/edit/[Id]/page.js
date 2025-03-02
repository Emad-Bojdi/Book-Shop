import DashboardPage from "@/components/template/DashboardPage"


const page = ({params}) => {
  return (
    <>
      <DashboardPage id={params.id}/>
    </>
  )
}

export default page
