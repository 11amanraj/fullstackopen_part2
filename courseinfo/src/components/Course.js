import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({course}) => {
    const total = course.parts.map(item => item.exercises)
                                .reduce((total,num) => total+num);

    return ( 
        <div>
            <Header header={course.name}/>
            <Content content={course.parts}/>
            <Total total={total}/>
        </div>
     );
}
 
export default Course;