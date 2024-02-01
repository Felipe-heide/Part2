import Header from './subcomponents/header'
import Content from './subcomponents/content'
import Total from './subcomponents/total'


const Course = ({ courses }) => (
  <div>
    <h1>WEB DEVELOPMENT CURRICULUM</h1>
    {courses.map((course) => (
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </div>
);

export default Course;
