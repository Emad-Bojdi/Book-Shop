import DashboardPage from "@/components/template/DashboardPage"


const page = ({params}) => {
  return (
    <>
      <DashboardPage editBookId={params.id}/>
    </>
  )
}

export default page
