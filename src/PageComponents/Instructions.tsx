import { ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { PAGE_CONFIG } from "./PageConfig";


const INSTRUCTIONS = [
  { id: "zoom", text: "Scroll to zoom" },
  { id: "rotate", text: "Hold left click to rotate" },
  { id: "shift", text: "Hold right click to shift position" }
];



export function Instruction(){
    return(
        <Row className='justify-content-center' style={{paddingTop:"0.5em"}}>
          <div className="d-flex justify-content-center">
            <ListGroup horizontal style={{textAlign:"center"}}>
                {INSTRUCTIONS.map(({ id, text }) => (
                          <ListGroupItem
                            key={id}
                            style={{
                              backgroundColor: PAGE_CONFIG.LIST_GROUP_ITEM_BACKGROUND,
                              color: PAGE_CONFIG.LIST_GROUP_ITEM_TEXT
                            }}
                            role="listitem"
                          >
                            {text}
                          </ListGroupItem>
                        )
                    )
                }
            </ListGroup>
          </div>
        </Row>
    )
}