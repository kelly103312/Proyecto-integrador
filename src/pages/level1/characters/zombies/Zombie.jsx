import Zombie1 from './Zombie1';
import Zombie2 from './Zombie2';
import Zombie3 from './Zombie3';

export default function Zombie() {
    return (
        <>
          
                <Zombie1 position={[0, 0, -10]} />
        
            
                <Zombie2 position={[0, 0, -30]} />

            
                <Zombie3 position={[0, 0, -50]} />
            
        </>
    );
}
