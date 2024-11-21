export default function Testimonials({data} : {
     data : {
        name : string,
     designation : string,
     rating : number,
     info : string,
     avatar : string
     }
}) {
  return <div className="px-[1rem] py-[1.5rem] flex flex-col items-center justify-center gap-[1rem]">
    <div className="w-[42.4px] h-[42.4px] rounded-full">
        <img src={data.avatar} alt="image" className="w-full h-full object-cover rounded-full" />
    </div>
  </div>;
}
