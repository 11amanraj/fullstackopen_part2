import Parts from './Parts'

const Content = ({content}) => {
   return ( 
        <>
            {content.map(chapter => <Parts chapter={chapter} key={chapter.id} />)}
        </>
     );
}
 
export default Content;