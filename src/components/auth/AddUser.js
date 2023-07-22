import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setAuthedUser } from "../../actions/authedUser";
import { handleAddUser } from "../../actions/addUser";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import "../../styles/add_user.scss";

import { toast } from "react-toastify";

const AddUser = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImageBlob, setCroppedImageBlob] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [lastCroppedAreaPixels, setLastCroppedAreaPixels] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);
  const [formReady, setFormReady] = useState(false);
  const [userNameAvailable, setUserNameAvailable] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const avatarRef = useRef(null);
  const [error, setError] = useState({});
  //   const [meetsRequirements, setMeetsRequirements] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  //   const [emailValid, setEmailValid] = useState(false);

  const [fieldValidity, setFieldValidity] = useState({
    username: false,
    password: false,
    email: false,
  });

  const checkOverallValidity = () => {
    return (
      fieldValidity.username && fieldValidity.password && fieldValidity.email
    );
  };

  const handleUserNameChange = (e) => {
    const meetsRequirements = isValidUsername(e.target.value);
    console.log("meetsReqs: ", meetsRequirements);

    if (meetsRequirements.isValid) {
      debouncedCheckUsernameAvailability(e.target.value);
    } else {
      console.log(meetsRequirements.reason);
      setFieldValidity((prev) => ({ ...prev, username: false }));
      setError({ ...error, username: "Please enter a valid username." });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const isValid = isValidPassword(e.target.value);
    setFieldValidity((prev) => ({ ...prev, password: isValid }));
    if (!isValid)
      setError({ ...error, password: "Please enter a valid password." });
  };

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
    const isValid = isValidEmail(e.target.value);
    setFieldValidity((prev) => ({ ...prev, email: isValid }));

    if (!isValid) setError({ ...error, email: "Please enter a valid email." });
    else setError({ ...error, email: "" });
    if (e.target.value === "") setError({ ...error, email: "" });
  };
  const [imageSrc, setImageSrc] = useState(null);

  //RUN EACH TIME avatarRef iIs CHANGED
  //STORE IMAGE TEMPORARILY TO DISPLAY TO USER
  //   useEffect(() => {
  //     console.log("image src: ", imageSrc)
  //   }, [imageSrc]);

  useEffect(() => {
    //CLEAN UP THE URL , WHICH IS NO LONGER REQUIRED AFTER DISMOUNTING
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleFileChange = () => {
    if (avatarRef.current && avatarRef.current.files[0]) {
      const selectedFile = avatarRef.current.files[0];
      const fileSizeLimit = 5 * 1024 * 1024; // for 5MB

      if (selectedFile.size > fileSizeLimit) {
        toast.error("Please upload a file smaller than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // Reset previewImage when a new file is selected
        setPreviewImage(null);
        setImageSrc(reader.result);
      });
      reader.readAsDataURL(avatarRef.current.files[0]);
      setIsCropping(true);
    }
  };
  // This will be called when the user clicks "Confirm Crop"
  const confirmCrop = useCallback(async () => {
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      //   console.log("croppedImageBlob", croppedImageBlob)
      const objectUrl = URL.createObjectURL(croppedImageBlob);
      //   console.log("objectUrl", objectUrl)
      setPreviewImage(objectUrl);
      setCroppedImageBlob(croppedImageBlob);
      setLastCroppedAreaPixels(croppedAreaPixels); // Store the crop

      setIsCropping(false); // Hide cropper
      // Clear the file input field
      if (avatarRef.current) {
        avatarRef.current.value = "";
      }
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  // This simply updates the state with the latest crop data
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    console.log(croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  //GET PASSED TO CROP COMPONENT
  //GET PASSED TO CROP COMPONENT AND SHOW CROPPED IMAGE

  //SET FORM READY
  const checkForm = () => {
    if (
      firstNameRef.current.value !== "" &&
      lastNameRef.current.value !== ""
      //   usernameRef.current.value !== "" &&
      //   emailRef.current.value !== ""
    ) {
      setFormReady(true);
    } else {
      setFormReady(false);
    }
    console.log("form ?: ", formReady);
  };

  const checkUsernameAvailability = useCallback(async (username) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER_URL}/api/auth/check-username-availability/${username}`
    );
    if (response.ok) {
      //   setUsername(username);
      console.log("valid name");
      setFieldValidity((prev) => ({ ...prev, username: true }));
    } else {
      setUsername("");
      setFieldValidity((prev) => ({ ...prev, username: false }));
      toast.error("This user name is already taken.");
    }
  }, []);
  //THIS WILL DELAY PINGING THE SERVER FOR A GIVEN TIME
  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      //   console.log("Debounced function triggered");
      if (timerId) {
        // console.log("Clearing previous timer");
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        // console.log("Calling function after delay");
        func(...args);
      }, delay);
    };
  };

  const debouncedCheckUsernameAvailability = debounce(
    checkUsernameAvailability,
    300
  );

  function isValidPassword(password) {
    const containsUppercase = /[A-Z]/.test(password);
    const containsLowercase = /[a-z]/.test(password);
    const containsNumbers = /[0-9]/.test(password);
    const containsSpecialChars = /[*!@#?$]/.test(password); // Adjust special characters as needed.
    const meetsLengthReq = password.length >= 8;
    console.log(
      "does it meet: ",
      containsUppercase &&
        containsLowercase &&
        containsNumbers &&
        containsSpecialChars &&
        meetsLengthReq
    );

    return (
      containsUppercase &&
      containsLowercase &&
      containsNumbers &&
      containsSpecialChars &&
      meetsLengthReq
    );
  }

  const isValidEmail = (email) => {
    // Simple email validation pattern
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  function isValidUsername(username) {
    // 1. Check minimum and maximum length (between 5 and 20 characters).
    if (username.length < 5 || username.length > 20) {
      return {
        isValid: false,
        reason: "Username should be between 5 and 20 characters.",
      };
    }

    // 2. Check character types (alphanumeric, underscore, dash).
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return {
        isValid: false,
        reason:
          "Username can only contain alphanumeric characters, underscores, and dashes.",
      };
    }

    // 3. Avoid special terms.
    const restrictedTerms = ["admin", "support"];
    for (let term of restrictedTerms) {
      if (username.toLowerCase().includes(term)) {
        return {
          isValid: false,
          reason: `Username should not contain the term "${term}".`,
        };
      }
    }

    // If all checks pass, return valid.
    return { isValid: true, reason: "Username is valid." };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkOverallValidity) {
      console.log("passed var checks");
      const user = {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        userName: username,
        email: email,
        password: password,
      };

      // Create a FormData instance to accommodate the file upload
      const formData = new FormData();
      Object.keys(user).forEach((key) => {
        formData.append(key, user[key]);
      });
      // Create a File object from the Blob
      const croppedImageFile = new File([croppedImageBlob], "avatar.jpg", {
        type: "image/jpeg",
      });
      formData.append("avatar", croppedImageFile);

      const response = await fetch("/api/create-user", {
        method: "POST",
        body: formData,
      });

      const userData = await response.json();
      console.log("userData: ", userData);
      //NOW WE PUT THE IMAGE IN STORAGE USING THE PRESIGNED URL FROM BACKEND
      if (response.ok) {
        // Upload the avatar using the PUT presigned URL
        const avatarResponse = await fetch(userData.put_presigned_url, {
          method: "PUT",
          body: croppedImageFile, // Use the cropped image file for the upload
        });

        if (avatarResponse.ok) {
          // After the avatar has been uploaded, notify the server
          const confirmResponse = await fetch("/api/confirm-avatar-upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userData.created,
              avatar_key: userData.avatar_key,
            }),
          });

          const confirmData = await confirmResponse.json();
          if (confirmResponse.ok) {
            // Dispatch the addUser action with the new user's data
            dispatch(handleAddUser(userData));
            // Dispatch the setAuthedUser action with the new user's ID
            dispatch(setAuthedUser(userData.user));
            // Now that the avatar has been uploaded and the server has been notified, navigate the user to the home page
            navigate("/");
          } else {
            toast.error(
              "There was an error confirming the avatar upload: " +
                confirmData.error
            );
          }
        } else {
          toast.error("There was an error uploading the avatar.");
        }
      } else {
        toast.error("There was an error creating the user: " + userData.error);
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-new d-flex flex-column">
        {/* Add form fields here */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label center">
            First name
          </label>
          <input
            type="text"
            ref={firstNameRef}
            placeholder="First Name"
            onChange={checkForm}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label center">
            Last name
          </label>
          <input
            type="text"
            ref={lastNameRef}
            placeholder="Last Name"
            onChange={checkForm}
            className="form-control"
          />
        </div>
        <div className="mb-3 position-relative">
          <div className="custom-input d-flex align-items-center justify-content-space-between px-2 position-relative">
            <label
              className="position-absolute"
              htmlFor="username"
              style={{
                top: "20%",
                transform: "translateY(-50%)",
                left: "12px",
                color: "grey",
                fontSize: "0.875em",
              }}
            >
              User name
            </label>
            <input
              type="text"
              value={username}
              required
              onChange={(e) => {
                setUsername(e.target.value);
                handleUserNameChange(e);
              }}
              style={{
                paddingRight: "40px",
                border: "none",
                backgroundColor: "transparent",
                paddingTop: "1.5em",
                outline: "none",
                boxShadow: "none",
                width: "85%",
              }}
              onFocus={(e) =>
                (e.target.parentNode.style.boxShadow =
                  "0 0 0 0.25rem rgba(13,113,255,.25)")
              }
              onBlur={(e) => (e.target.parentNode.style.boxShadow = "none")}
            />

            <div
              className="border rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "20px", height: "20px", marginRight: "1em" }}
            >
              {fieldValidity.username && <span>&#10003;</span>}
            </div>

            {/* {error.username && <p className="error-text">{error.username}</p>} */}
          </div>
        </div>
        <div className="mb-3 position-relative">
          <div className="custom-input d-flex align-items-center justify-content-space-between px-2 position-relative">
            <label
              className="position-absolute"
              htmlFor="email"
              style={{
                top: "20%",
                transform: "translateY(-50%)",
                left: "12px",
                color: "grey",
                fontSize: "0.875em",
              }}
            >
              Email
            </label>
            <input
              type="email"
              //   ref={emailRef}
              value={email}
              required
              onChange={
                handleEmailChange
                // setEmailValid(isValidEmail(e.target.value));
              }
              style={{
                paddingRight: "40px",
                border: "none",
                backgroundColor: "transparent",
                paddingTop: "1.5em",
                outline: "none",
                boxShadow: "none",
                width: "85%",
              }}
              onFocus={(e) =>
                (e.target.parentNode.style.boxShadow =
                  "0 0 0 0.25rem rgba(13,113,255,.25)")
              }
              onBlur={(e) => {
                e.target.parentNode.style.boxShadow = "none";
                setError({ ...error, email: "" });
              }}
            />
            {/* Checkmark for valid email */}

            <div
              className="border rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "20px", height: "20px", marginRight: "1em" }}
            >
              {fieldValidity.email && <span>&#10003;</span>}
            </div>
          </div>
          {error.email && <p className="error-text">{error.email}</p>}
        </div>

        <div className="mb-3 position-relative">
          <div className="custom-input d-flex align-items-center justify-content-space-between px-2 position-relative">
            {/* This is the first flex item containing the label and input */}
            <label
              className="position-absolute"
              htmlFor="password"
              style={{
                top: "20%",
                transform: "translateY(-50%)",
                left: "12px",
                color: "grey",
                fontSize: "0.875em",
              }}
            >
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              style={{
                paddingRight: "90px",
                border: "none",
                backgroundColor: "transparent",
                paddingTop: "1.5em",
                outline: "none",
                boxShadow: "none",
                width: "70%",
              }}
              onFocus={(e) =>
                (e.target.parentNode.style.boxShadow =
                  "0 0 0 0.25rem rgba(13,113,255,.25)")
              }
              onBlur={(e) => (e.target.parentNode.style.boxShadow = "none")}
            />
            <div className="d-flex align-items-center" style={{ width: "15%" }}>
              <div
                className="border rounded-circle d-flex align-items-center justify-content-center mr-2"
                style={{ width: "20px", height: "20px" }}
              >
                {fieldValidity.password && <span>&#10003;</span>}{" "}
                {/* This is the checkmark. */}
              </div>
              <button
                type="button"
                className="btn btn-link"
                style={{
                  paddingTop: "2px",
                  fontSize: "0.875em",
                  textDecoration: "none",
                  color: "#3f3f3f",
                }}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>
        <div className="mb-3 d-flex align-items-center gap-2">
          <label htmlFor="file-upload" className="custom-file-upload">
            {/* {previewImage ? "Select Image" : "Choose Image"} */}
            Choose Image
          </label>
          <input
            type="file"
            ref={avatarRef}
            accept=".jpg, .jpeg, .png, .gif"
            id="file-upload"
            onChange={handleFileChange}
          />
          {previewImage ? (
            // <div className="mb-3">
            <div>
              <img
                src={previewImage}
                alt="Avatar preview"
                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                onDoubleClick={() => {
                  if (lastCroppedAreaPixels) {
                    setCroppedAreaPixels(lastCroppedAreaPixels); // set the last cropped state
                    setIsCropping(true); // reopen the cropping tool
                  }
                }}
              />
            </div>
          ) : // </div>
          null}
        </div>
        <div className="mb-3">
          {isCropping && imageSrc && (
            <>
              <Cropper
                image={imageSrc} // convert the file into a URL
                crop={crop}
                zoom={zoom}
                aspect={1} // circular crop area
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="round"
                backgroundColor="rgba(0, 0, 0, 0.5)" // semi-transparent black
              />
              <div className="d-flex justify-content-center mb-3">
                <button
                  onClick={confirmCrop}
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    zIndex: 9999,
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "50%",
                    padding: "5px 10px",
                    fontSize: "1.2em",
                    cursor: "pointer",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  x
                </button>
              </div>
            </>
          )}
        </div>
        {!isCropping && (
          <button
            type="submit"
            disabled={!formReady || !userNameAvailable}
            className="btn btn-primary"
          >
            Sign Up
          </button>
        )}
      </form>
    </div>
  );
};

export default AddUser;
