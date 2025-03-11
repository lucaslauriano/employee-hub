import EmployeeForm from '@/app/employees/components/EmployeeForm';

type LayoutProps = {
  params: {
    id: string;
  };
};

const EditEmployeePage = ({ params }: LayoutProps) => {
  return <EmployeeForm id={params.id} />;
};

export default EditEmployeePage;
