
const Roadmap = ({roadmap}) => {

    const {title} = roadmap || {};    
    return (
        <div>
          <h3>{title}</h3>  
        </div>
    );
};

export default Roadmap;