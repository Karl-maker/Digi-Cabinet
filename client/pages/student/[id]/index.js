import { useRouter } from "next/router";

const Student = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Student: {id}</p>;
};

export default Student;
