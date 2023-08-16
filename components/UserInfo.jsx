const UserInfo = () => {
  return (
    <div className=" grid place-items-center h-screen">
      <div className="rounded-lg shadow-lg p-5 flex flex-col gap-3">
        <h1>
          Name: <span className="font-bold">John</span>
        </h1>
        <h1>
          Email: <span className="font-bold">johndoe@forte.com</span>
        </h1>
        <button className=" bg-red-500 py-2 px-3 text-white">Log out</button>
      </div>
    </div>
  );
};

export default UserInfo;
