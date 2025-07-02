export default function UserProfile({params}:any) {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-2 min-h-screen ">
        <h1>Profile</h1>
        <hr />
        <p>Profile User : 
            <span className="text-black p-2 rounded bg-yellow-300"> {params.id}</span>
        </p>
      </div>
    </>
  );
}
