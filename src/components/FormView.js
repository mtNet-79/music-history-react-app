import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import "../stylesheets/FormView.css";

const ComposerForm = (props) => {
  const history = useHistory();
  const [composerName, setComposerName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [deathday, setDeathday] = useState("");
  const [nationality, setNationality] = useState("");
  const [period_id, setPeriod_id] = useState("");
  const [stylesArr, setStylesArr] = useState([]);
  const [compositionsArr, setCompositionsArr] = useState([]);
  const [compositionInput, setCompositionInput] = useState([]);
  const [contemporariesArr, setContemporariesArr] = useState([]);
  const [performersArr, setPerformersArr] = useState([]);
  const [rating, setRating] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [selectedPerformer, setSelectedPerformer] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNations, setFilteredNations] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const inputNameRef = useRef(null);
  const [matchedComposer, setMatchedComposer] = useState(null)

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
    nations
  } = props;
  // use useEffect hook to fetch categories on component mount
//   useEffect(() => {
//     // $.ajax({
//     //   url: `/composers/create`, //TODO: update request URL
//     //   type: "GET",
//     //   success: (result) => {
//     //     setState(result);
//     //   },
//     //   error: (error) => {
//     //     alert("Unable to load. Please try your request again");
//     //   },
//     // });
//   }, []); // empty dependency array ensures this effect runs only once on mount
  
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
        nationality: nationality,
        styles: styles,
        compositions: compositions,
        contemporaries: contemporaries,
        performers: performers,
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

//   const checkForm = (e) => {
//     if (e.target.id === "composerName") {
//       Object.keys(composers).forEach((composerId) => {
//         composerName === composerId
//           ? alert("This composer has already been entered.")
//           : setComposerName(e.target.value);
//       });
//       setComposerName(e.target.value);
//     }
//     if (e.target.id === "birthday") setBirthday(e.target.value);
//     if (e.target.id === "deathday") setDeathday(e.target.value);
//     if (e.target.id === "nationality") setNationality(e.target.value);
//     if (e.target.id === "period_id") setPeriod_id(e.target.value);
//   };



  const handleBlur = () => {
    if (composerName) {
      // const matched = composers.find(
      //   (composer) => composer.name === composerName
      // );
      if (matchedComposer) {
        alert("Record already exist, please provide a unique name");
      }
    }
  };

  const handleChange = (event) => {
    //grab vars from event target
    const { value } = event.target;
    const { id } = event.target;
    //for composers name input
    if (id === "name") {
      const matchArr = composers.filter((composer) =>
        composer.name.toLowerCase().startsWith(value.toLowerCase())
      );
      const top_match =
        matchArr.length > 0 ? matchArr[0].name : null;
      if (top_match) {
        const fullname = value.toLowerCase();
        //name without the typed portion
        const nameEnd = top_match.slice(fullname.length);
        //setMatchedComposer to test the outer span
        setMatchedComposer(top_match)
        inputNameRef.current.setSelectionRange(
            fullname,
            top_match.length
        );
        inputNameRef.current.style.color = "#999";
        inputNameRef.current.style.fontWeight = "lighter";
      } else {
        setComposerName(value);
        setMatchedComposer(null)
        inputNameRef.current.style.color = "#000";
        inputNameRef.current.style.fontWeight = "normal";
      }
    }
    //life-dates inputs
    if (id==="birthday") setBirthday(value);
    if (id==="deathday") setDeathday(value);
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
  };


  const handleSelectChange = (e) => {
    if (e.target.value) {
      if (e.target.id === "styles") {
        const selectedOption = styles.find((s) => s.id === parseInt(styleId));
        console.log("Selected Option: ", selectedOption);
        setStylesArr((styleArr) => [...styleArr, e.target.id]);
      }
      if (e.target.id === "performers") {
        setSelectedPerformer(e.target.value);
        setPerformersArr((performersArr) => [...performersArr, e.target.id]);
      }
      if (e.target.id === "compositions")
        setStylesArr((styles) => [...styles, e.target.value]);
    }
  };

  // const filteredCompositions = compositions.filter((c) =>
  //   c.name.toLowerCase().includes(compositionInput.toLowerCase())
  // );
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
  };
  const removePerformer = (performerToRemove) => {
    setPerformersArr(
      performersArr.filter((p) => p.id !== performerToRemove.id)
    );
  };
  const handleListInput = (e) => {
    console.log("handleListInput event from : ", e.target.id)
    if (e.target.id === "compositions" && compositionInput.trim() !== "")
      setCompositionsArr([...compositionsArr, compositionInput]);
    if (e.target.id === "contemporaries" && contemporaryInput.trim() !== "")
      setCompositionsArr([...contemporariesArr, contemporaryInput]);
    if (e.target.id === "compositions" && setCompositionInput.trim() !== "")
      setCompositionsArr([...compositionsArr, compositionInput]);
    if (e.target.id === "compositions" && setCompositionInput.trim() !== "")
      setCompositionsArr([...compositionsArr, compositionInput]);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (e.target.id === "add_performer") history.push("/add-performer"); // navigate to performer form
  };

  const handleInputClick = () => {
    inputRef.current.focus();
  };

  return (
    <div id="add-form" className="form-wrapper">
      <h2>Add a New Composer</h2>
      <form className="form" id="add-composer-form" onSubmit={handleSubmit}>
        <h3 className="form-heading">
          Add your composers{" "}
          <a href="/" title="Back to homepage">
            <i className="fa fa-home pull-right"></i>
          </a>
        </h3>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <div
            className="form-control"
            onClick={handleInputClick}
            style={{ position: "relative" }}
          >
            <span
              style={{
                position: "absolute",
                left: 5,
                top: 5,
                color: matchedComposer ? "gray" : "black",
              }}
            >
              {composerName}
            </span>
            {matchedComposer && (
              <span
                style={{
                  position: "absolute",
                  left: 5,
                  top: 5,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {matchedComposer.name.slice(0, composerName.length)}
              </span>
            )}
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              ref={inputRef}
              style={{ opacity: 0, position: "absolute", top: 0, left: 0 }}
              value={composerName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoFocus

            />
          </div>
        </div>
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
                  key={nation}
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
            {state.periods &&
              state.periods.map((period) => (
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
            {state.styles &&
              state.styles.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </select>
          {selectedStyles.length > 0 && (
            <div id="styles_hold">
              <h2>Selected Styles:</h2>
              <ul>
                {selectedStyles.map((s) => (
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

        {/* <div className="mb-3">
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
        </div> */}

        <div className="mb-3">
          <label htmlFor="contemporaries">Contemporaries</label>
          <input
            type="text"
            name="contemporaries"
            id="contemporaries"
            className="form-control"
            placeholder="Mozart"
            value={contemporaryInput}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            required
          />

          {filteredComposers.length > 0 && (
            <div>
              <h2>Filtered Composers:</h2>
              <ul>
                {filteredComposers.map((c) => (
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
            {performers.map((performer) => (
              <option key={performer.id} value={performer.id}>
                {performer.name}
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

export default FormView;
