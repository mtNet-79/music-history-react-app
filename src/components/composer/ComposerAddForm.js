import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import NameInput from "../NameInput";
// import "../styles/FormView.css";

const ComposerAddForm = (props) => {
  const navigate = useNavigate();
  const [composerName, setComposerName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [deathday, setDeathday] = useState("");
  const [nationality, setNationality] = useState("");
  const [period_id, setPeriod_id] = useState("");
  const [stylesArr, setStylesArr] = useState([]);
  const [compositionsArr, setCompositionsArr] = useState([]);
  const [compositionInput, setCompositionInput] = useState("");
  const [contemporariesArr, setContemporariesArr] = useState([]);
  const [contemporaryInput, setContemporaryInput] = useState("");
  const [performersArr, setPerformersArr] = useState([]);
  const [rating, setRating] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [selectedPerformer, setSelectedPerformer] = useState([""]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNations, setFilteredNations] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const inputNameRef = useRef(null);
  const inputContemporaryRef = useRef(null);
  const [matchedContemporary, setMatchedContemporary] = useState("");
  const [matchedComposer, setMatchedComposer] = useState("");

  const {
    dispatch,
    image,
    composers,
    styles,
    periods,
    nationalities,
    compositions,
    performers,
    userName,
    nations,
  } = props;

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    $.ajax({
      url: "add", //TODO: update request URL
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        name: composerName,
        birthday: birthday,
        deathday: deathday,
        period: period_id,
        nationality: nationality,
        styles: stylesArr,
        compositions: compositionsArr,
        contemporaries: contemporariesArr,
        performers: performersArr,
        rating: rating,
        favorite: favorite,
      }),
      xhrFields: {
        withCredentials: true,
      },
      crossDomain: true,
      success: (result) => {
        document.getElementById("add-composer-form").reset();
      },
      error: (error) => {
        alert("Unable to add composer. Please try your request again");
      },
    });
  };

  const handleBlur = (e) => {
    if (e.target.id === "contemporary" && e.relatedTarget === null) {
      // The user moved focus outside the window, ignore the completion text
      setMatchedContemporary(null);
    } else {
      // The user moved focus to another element within the window, apply the completion text
    }
  };

  const handleChange = (event) => {
    //grab vars from event target
    const { value } = event.target;
    const { id } = event.target;

    //life-dates inputs
    if (id === "birthday") setBirthday(value);
    if (id === "deathday") setDeathday(value);
    //place of birth or indentity
    //select
    if (id === "nationality") {
      setNationality(value);
      setSelectedIndex(-1);
      //if there is text in the input
      if (value.length > 0) {
        const matches = nations.filter((nation) =>
          nation.toLowerCase().startsWith(value.toLowerCase())
        );
        //only show first 6 match results
        setFilteredNations(matches.slice(0, 6));
      } else {
        setFilteredNations([]);
      }
    }
    if (id === "compositions") {
      setCompositionInput(value);

      compositions.forEach((c) => {});
      setCompositionInput(value);
    }
    if (id === "contemporaries") {
      setContemporaryInput(value);
      //find all composers whose name property matching, so far, what the user has typed
      const matchArr = composers.filter((composer) =>
        composer.name.toLowerCase().startsWith(value.toLowerCase())
      );
      //only show the top match, user needs to type more if it is ambigous and there is more than one
      matchedContemporary = matchArr.length > 0 ? matchArr[0].name : null;
      //each time there is match
      if (matchedContemporary) {
        const typedStr = value.toLowerCase();
        //name without the typed portion
        const completionText = matchedContemporary.slice(typedStr.length);

        inputContemporaryRef.current.setSelectionRange(
          typedStr.length,
          matchedContemporary.length
        );
        inputContemporaryRef.current.style.color = "#999";
        inputContemporaryRef.current.style.fontWeight = "lighter";
        // get the start and end position of the typed string
        const startPos = inputContemporaryRef.current.selectionStart;
        const endPos = inputContemporaryRef.current.selectionEnd;

        // set the input value with the matched composer name and completion text
        //same as matchedContemporary, just experimenting here
        const newValue = `${typedStr}${completionText}`;
        inputContemporaryRef.current.value = newValue;
        // set the cursor position to the end of the typed string
        inputContemporaryRef.current.setSelectionRange(startPos, endPos);

        // set the style of the completion text
        const completionStartPos = startPos + typedStr.length;
        const completionEndPos = completionStartPos + completionText.length;
        inputContemporaryRef.current.setSelectionRange(
          completionStartPos,
          completionEndPos
        );
        inputContemporaryRef.current.style.color = "#999";
        inputContemporaryRef.current.style.fontWeight = "lighter";
        // inputNameRef.current.setSelectionRange(typedStr, matchedContemporary.length);
        // inputNameRef.current.style.color = "#999";
        // inputNameRef.current.style.fontWeight = "lighter";
      } else {
        // reset the style if there is no match
        inputContemporaryRef.current.style.color = "";
        inputContemporaryRef.current.style.fontWeight = "";
      }
    }
  };

  const handleSelectChange = (e) => {
    if (e.target.value) {
      if (e.target.id === "styles") {
        // Get the selected options as an array
        const selectedOptions = Array.from(e.target.selectedOptions);
        // Get the selected styles from the `styles` array
        const selectedStyles = selectedOptions.map((option) =>
          styles.find((style) => style.id === parseInt(option.id))
        );

        setStylesArr((styleArr) => [...styleArr, selectedStyles]);
      }
      if (e.target.id === "performers") {
        setSelectedPerformer(e.target.value);
        setPerformersArr((performersArr) => [...performersArr, e.target.id]);
      }
      if (e.target.id === "compositions")
        setStylesArr((styles) => [...styles, e.target.value]);
    }
  };

  const handleRemoveStyle = (id) => {
    setStylesArr((stylesArr) => stylesArr.filter((s) => s.id !== id));
  };
  const filteredCompositions = compositionInput
    ? Object.keys(compositions).filter((cid) =>
        compositions[cid].name
          .toLowerCase()
          .includes(compositionInput.toLowerCase())
      )
    : [];
  const handleKeyDown = (e) => {
    console.log("what is e.key on keydown: ", e.key);
    if (e.target.tagName === "SELECT") {
      const typedValue = e.key;
      const matchingOption = performers.find((performer) =>
        performer.name.toLowerCase().startsWith(typedValue.toLowerCase())
      );

      if (matchingOption) {
        e.preventDefault();
        setSelectedPerformer(matchingOption.id);
        const optionEl = document.querySelector(
          `option[value="${matchingOption.id}"]`
        );
        if (optionEl) {
          optionEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    } else {
      if (e.keyCode === 13) {
        e.preventDefault();
        handleListInput(e);
      }
      if (e.key === "ArrowDown" && selectedIndex < filteredNations.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      } else if (e.key === "ArrowUp" && selectedIndex > -1) {
        setSelectedIndex(selectedIndex - 1);
      } else if (e.key === "Enter") {
        if (selectedIndex > -1) {
          setNationality(filteredNations[selectedIndex]);
        } else {
          const newNation = nationality.trim();
          if (newNation.length > 0) {
            nations.push(newNation);
            // TODO: add new nation to DB
          }
        }
        setFilteredNations([]);
      }
    }
    // Check if focus is in the contemporary input box
    if (e.target.id === "contemporary-input") {
      // Handle tab key
      if (e.key === "Tab") {
        e.preventDefault();
        // Use the top match as the input value
        if (matchedContemporary) {
          setContemporariesArr((contemporariesArr) => ({
            ...contemporariesArr,
            matchedComposer,
          }));
        }
        // Reset the matched composer and input style
        setMatchedContemporary(null);
        inputContemporaryRef.current.style.color = "#000";
        inputContemporaryRef.current.style.fontWeight = "normal";
      }
    }
  };
  const removePerformer = (performerToRemove) => {
    setPerformersArr(
      performersArr.filter((p) => p.id !== performerToRemove.id)
    );
  };
  const handleListInput = (e) => {
    console.log("handleListInput event from : ", e.target.id);
    if (e.target.id === "compositions" && compositionInput.trim() !== "")
      setCompositionsArr([...compositionsArr, compositionInput]);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (e.target.id === "add_performer") navigate("/performers/create"); // navigate to performer form
  };

  const handleInputClick = () => {
    console.log("CHECK INPUT CLICK");
    inputNameRef.current.focus();
  };
  const handleFavoriteClick = () => {
    setFavorite((favorite) => !favorite);
  };

  return (
    <div id="add-form" className="form-wrapper">
      <form className="form" id="add-composer-form" onSubmit={handleSubmit}>
        <h3 className="form-heading">
          Add your composers{" "}
          <a href="/" title="Back to homepage">
            <i className="fa fa-home pull-right"></i>
          </a>
        </h3>
        <NameInput
          composerName={composerName}
          setComposerName={setComposerName}
        />
        <div className="mb-3">
          <label>Years</label>
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                name="birthday"
                id="birthday"
                value={birthday}
                className="form-control"
                placeholder="Born"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                name="deathday"
                id="deathday"
                value={deathday}
                className="form-control"
                placeholder="Deceased"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="nationality">Nationality by Birth</label>
          <input
            type="text"
            name="nationality"
            id="nationality"
            className="form-control"
            placeholder="Austria"
            value={nationality}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
          />
          {filteredNations.length > 0 && (
            <ul>
              {filteredNations.map((nation, index) => (
                <li
                  key={index}
                  className={index === selectedIndex ? "highlighted" : ""}
                  onClick={() => setNationality(nation)}
                >
                  {nation}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="period_id">Period</label>
          <select name="period" id="period" onChange={handleSelectChange}>
            <option value="">Select a period</option>
            {periods &&
              periods.map((period) => (
                <option key={period.id} value={period.id}>
                  {period.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="styles">Styles</label>
          <select name="styles" onChange={handleSelectChange}>
            <option value="">Select a style</option>
            {styles &&
              Object.keys(styles).map((skey) => (
                <option key={styles[skey].id} value={styles[skey].id}>
                  {styles[skey].name}
                </option>
              ))}
          </select>
          {stylesArr.length > 0 && (
            <div id="styles_hold">
              <h2>Selected Styles:</h2>
              <ul>
                {stylesArr.map((s) => (
                  <li key={s.id}>
                    {s.name}
                    <button onClick={() => handleRemoveStyle(s.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="compositions">Compositions</label>
          <input
            type="text"
            name="compositions"
            id="compositions"
            className="form-control"
            placeholder="Air on the G String"
            value={compositionInput}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            required
          />
          {filteredCompositions.length > 0 && (
            <div>
              <h2>Filtered Compositions:</h2>
              <ul>
                {filteredCompositions.map((c) => (
                  <li onClick={() => handleChange()} key={c.id}>
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="contemporaries">Contemporaries</label>
          <input
            type="text"
            name="contemporaries"
            id="contemporaries"
            className="form-control"
            ref={inputContemporaryRef}
            placeholder="Mozart"
            value={contemporaryInput}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            required
          />

          {contemporariesArr.length > 0 && (
            <div>
              <h2>Filtered Composers:</h2>
              <ul>
                {contemporariesArr.map((c) => (
                  <li
                    onClick={() =>
                      setContemporariesArr([...contemporariesArr, c.id])
                    }
                    key={c.id}
                  >
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="performers">Performers</label>
          <select
            type="text"
            name="performers"
            id="performers"
            className="form-control"
            value={selectedPerformer}
            multiple
            onChange={handleSelectChange}
            required
            onKeyDown={handleKeyDown}
          >
            <option value="">Select a performer</option>
            {Object.keys(performers).map((pid) => (
              <option key={pid} value={pid}>
                {performers[pid].name}
              </option>
            ))}
          </select>
          {performersArr.length > 0 && (
            <div>
              <h2>Selected Performers:</h2>
              <ul>
                {performersArr.map((p) => (
                  <li key={p.id}>
                    {p.name}
                    <button onClick={() => removePerformer(p)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            className="btn btn-secondary mt-2"
            onClick={handleButtonClick}
          >
            Add Performer
          </button>
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating
          </label>
          <select name="rating" onChange={handleSelectChange}>
            <option value="0">Select a rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Favorite
          </label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="favorite"
              name="favorite"
              checked={favorite}
              onChange={handleFavoriteClick}
            />
            <label className="form-check-label" htmlFor="favorite">
              <FontAwesomeIcon
                icon={faHeart}
                color={favorite ? "red" : "gray"}
              />
            </label>
          </div>
        </div>
        <input type="submit" className="button" value="Submit" />
      </form>
    </div>
  );
};

// ComposerAddForm.propTypes = {
//   authedUser: PropTypes.string.isRequired,
//   image: PropTypes.string,
//   composers: PropTypes.arrayOf(PropTypes.object).isRequired,
//   styles: PropTypes.arrayOf(PropTypes.string),
//   periods: PropTypes.arrayOf(PropTypes.string),
//   nationalities: PropTypes.arrayOf(PropTypes.string),
//   compositions: PropTypes.arrayOf(PropTypes.object),
//   performers: PropTypes.arrayOf(PropTypes.object),
//   userName: PropTypes.string,
//   nations: PropTypes.arrayOf(PropTypes.string),
// };

ComposerAddForm.propTypes = {
  authedUser: PropTypes.string.isRequired,
  image: PropTypes.string,
  composers: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  periods: PropTypes.object,
  nationalities: PropTypes.object,
  compositions: PropTypes.object,
  performers: PropTypes.object,
  authedUser: PropTypes.string,
  nations: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = ({
  authedUser,
  composers,
  styles,
  image,
  periods,
  nationalities,
  compositions,
  performers,
  userName,
  nations,
}) => ({
  authedUser,
  composers,
  styles,
  image,
  periods,
  nationalities,
  compositions,
  performers,
  userName,
  nations,
});

export default connect(mapStateToProps)(ComposerAddForm);
