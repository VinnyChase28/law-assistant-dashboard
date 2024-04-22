import {
  platformItems,
  useCasesItems,
  resourcesItems,
  getStartedItems,
  type NavItem,
} from "@marketing/config/nav";


export const Footer = () => {
  const renderLinkSection = (title: string, items: NavItem[]) => (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-bold">{title}</h3>
      {items.map((item) => (
        <div key={item.title}>
          <a
            href={item.href}
            className="opacity-60 hover:opacity-100"
            title={item.description}
          >
            {item.icon ? (
              <item.icon className="mr-2 inline-block" size={18} />
            ) : null}
            {item.title}
          </a>
        </div>
      ))}
    </div>
  );

  return (
    <footer id="footer">
      <hr className="mx-auto w-11/12" />

      <section className="container grid grid-cols-2 gap-x-12 gap-y-8 py-20 md:grid-cols-4 xl:grid-cols-6">
        {renderLinkSection("Platform", platformItems)}
        {renderLinkSection("Use Cases", useCasesItems)}
        {renderLinkSection("Resources", resourcesItems)}
        {renderLinkSection("Get In Touch", getStartedItems)}
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024{" "}
          <a
            href="https://lawassistant.ai"
            className="border-primary text-primary transition-all hover:border-b-2"
          >
            lawassistant.ai
          </a>
        </h3>
      </section>
    </footer>
  );
};