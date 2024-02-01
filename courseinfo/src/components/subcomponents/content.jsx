import Part from "./part"
const Content = ({ parts }) => (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );

  export default Content