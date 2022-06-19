function HeaderIcon({ Icon, active, url }) {
  return (
    <a href={url} className="appearance-none">
      <div className="flex items-center cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 rounded-xl active:border-b-2 active:border-blue-500 group">
        <Icon
          className={`nav-link h-5 text-gray-100 text-center sm:h-7 mx-auto group-hover:text-blue-500 ${
            active && "text-blue-500"
          }`}
        />
      </div>
    </a>
  );
}

export default HeaderIcon;
