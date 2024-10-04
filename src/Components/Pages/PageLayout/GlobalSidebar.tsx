"use client";
import SVG from "@/CommonComponent/SVG";
import { Col, Nav, NavItem, NavLink } from "reactstrap";
import { useAppDispatch } from "@/Redux/Hooks";

interface SidebarProps {
  data: Array<{ id: string; icon: string; title: string; detail: string }>;
  navId: string; // current active navId
  setNavIdAction: (id: string) => void; // action dispatcher to set navId
}

const GlobalSidebar: React.FC<SidebarProps> = ({ data, navId, setNavIdAction }) => {
  const dispatch = useAppDispatch();

  return (
    <Col xxl="3" xl="4" className="box-col-4e sidebar-left-wrapper mb-2 add-product-tab">
      <Nav pills className="sidebar-left-icons border-0" tabs>
        {data.map((item, i) => (
          <NavItem key={i}>
            <NavLink
              className="border-0"
              active={navId === item.id}
              onClick={() => dispatch(setNavIdAction(item.id))}
            >
              <div className="nav-rounded">
                <div className="product-icons">
                  <SVG className="stroke-icon" iconId={item.icon} />
                </div>
              </div>
              <div className="product-tab-content">
                <h5>{item.title}</h5>
                <p>{item.detail}</p>
              </div>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </Col>
  );
};

export default GlobalSidebar;
