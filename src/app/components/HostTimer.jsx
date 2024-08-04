let timer = 0;

export function StartTimer(newTime){
  timer = newTime;
}

export function Timer({OnTimerFinished}){
    let [count, setCount] = useState(timer);

    useInterval(() => {
      setCount(count - 1);
    }, 1000);   
    if(count < 0){
      OnTimerFinished();
    }
    return (
        <div>
            {count}
        </div>
    );
}

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
