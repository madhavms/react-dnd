import React, { useRef, useState } from "react";

const DragNDrop = ({ data }) => {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    console.log("drag starting...", params);
    dragItem.current = params;
    dragNode.current = e.target;
    console.log("target", dragNode.current);
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => setDragging(true), 0);
  };

  const handleDragEnter = (e, params) => {
    console.log("Entering drag",params);
    const currentItem = dragItem.current;
    if(e.target !== dragNode.current){
        console.log("TARGET IS NOT THE SAME")
        setList(oldList => {
            let newList = JSON.parse(JSON.stringify(oldList))
            newList[params.grpI].items.splice(params.itemI,0,newList[currentItem.grpI].items.splice(currentItem.itemI,1)[0]);
            dragItem.current = params;
            return newList
        })
    }
  };


  const handleDragEnd = () => {
    console.log("Ending drag...");
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (
      currentItem.grpI === params.grpI &&
      currentItem.itemI === params.itemI
    ) {
      return "current dnd-item";
    }
    return "dnd-item";
  };

  const handleDragOver = (e) => e.preventDefault()

  return (
    <div className="drag-n-drop">
      {list.map((grp, grpI) => (
        <div key={grp.title} onDragOver={handleDragOver} onDragEnter={
            dragging && !grp.items.length ? (e) => handleDragEnter(e, {grpI, itemI:0}): null} className="dnd-group">
          <div className="group-title">{grp.title}</div>
          {grp.items.map((item, itemI) => (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
              onDragEnter={
                dragging ? (e) => handleDragEnter(e, { grpI, itemI }) : null
              }
              key={item}
              className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
            >
              ITEM {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DragNDrop;
