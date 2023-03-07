import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function NameInput(props) {
  const { composers, composerName, setComposerName } = props;
  const composerRef = useRef(null);

  const generateOptions = (names) => {
    const dataList = document.createElement("datalist");
    dataList.id = "composerList";

    names.forEach((name) => {
      const option = document.createElement("option");
      option.value = "used: " + name;
      dataList.appendChild(option);
    });

    return dataList;
  };

  const handleOnClick = (e) => {
    // const input = composerRef.current;
    // const datalist = input.nextSibling;
    // if (datalist) {
    //   datalist.remove();
    // }
  }

  const handleChange = (event) => {
    const { value } = event.target;
    setComposerName(value);

    const input = composerRef.current;
    const datalist = input.nextSibling;
    if (datalist) {
      datalist.remove();
    }
    if (value.trim() !== "") {
      const matchedComposers = Object.keys(composers)
        .filter((cid) => {
          return composers[cid].name
            .toLowerCase()
            .startsWith(value.trim().toLowerCase());
        })
        .map((cid) => composers[cid].name);
      if (matchedComposers.length > 0) {
        const dataList = generateOptions(matchedComposers);

        input.setAttribute("autocomplete", "on");
        input.setAttribute("list", "composerList");
        input.parentNode.appendChild(dataList);
      

        composerRef.current.style.color = "#999";
        composerRef.current.style.fontWeight = "lighter";
      } else {
    
        input.setAttribute("autocomplete", "off");
        input.removeAttribute("list");
        composerRef.current.style.color = "#000";
        composerRef.current.style.fontWeight = "normal";
      }
    } else {
      input.setAttribute("autocomplete", "off");
      input.removeAttribute("list");
      composerRef.current.style.color = "#000";
      composerRef.current.style.fontWeight = "normal";
    }
  };

  const handleBlur = (e) => {
    if (composerName) {
      // const matched = composers.find(
      //   (composer) => composer.name === composerName
      // );
    //   const input = composerRef.current;
    // const datalist = input.nextSibling;
    // if (datalist) {
    //   datalist.remove();
    // }
      const isDuplicate = Object.values(composers).some(
        (composer) => composer.name === composerName
      );
      if (isDuplicate) {
        setComposerName("");
        composerRef.current.style.color = "#000";
        composerRef.current.style.fontWeight = "normal";
        alert("Please use a unique composer name");
        composerRef.current.focus();
      }
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor="composer_name">Name</label>

      <input
        type="text"
        name="composer_name"
        id="composer_name"
        className="form-control"
        ref={composerRef}
        value={composerName}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="off"
        required
        autoFocus
      />
    </div>
  );
}

NameInput.propTypes = {
  composers: PropTypes.object.isRequired,
};

const mapStateToProps = ({ composers }, { composerName, setComposerName }) => ({
  composers,
  composerName,
  setComposerName,
});

export default connect(mapStateToProps)(NameInput);
