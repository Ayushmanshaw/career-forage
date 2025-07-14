import React from "react";

const WorkExperienceForm = ({ data, onChange, onAdd, onRemove }) => {
  return (
    <div className="card bg-base-200 shadow-md">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-xl">Work Experience*</h2>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={onAdd}
          >
            Add Experience
          </button>
        </div>

        {data.map((exp, index) => (
          <div key={exp.id} className="mb-6 p-4 bg-base-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Experience #{index + 1}</h3>
              {data.length > 1 && (
                <button
                  type="button"
                  className="btn btn-sm btn-ghost text-error"
                  onClick={() => onRemove(exp.id)}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Title */}
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text">Job Title*</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={exp.jobTitle}
                  onChange={(e) =>
                    onChange(
                      "workExperience",
                      "jobTitle",
                      e.target.value,
                      index
                    )
                  }
                />
              </div>

              {/* Company */}
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text">Company*</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={exp.company}
                  onChange={(e) =>
                    onChange("workExperience", "company", e.target.value, index)
                  }
                />
              </div>

              {/* Start Date */}
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text">Start Date*</span>
                </label>
                <input
                  type="month"
                  className="input input-bordered"
                  value={exp.startDate}
                  onChange={(e) =>
                    onChange(
                      "workExperience",
                      "startDate",
                      e.target.value,
                      index
                    )
                  }
                />
              </div>

              {/* End Date + Current */}
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text">End Date</span>
                </label>
                <input
                  type="month"
                  className="input input-bordered"
                  value={exp.endDate}
                  onChange={(e) =>
                    onChange("workExperience", "endDate", e.target.value, index)
                  }
                  disabled={exp.current}
                />
                <label className="label cursor-pointer mt-4">
                  <span className="label-text">I currently work here</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={exp.current}
                    onChange={(e) =>
                      onChange(
                        "workExperience",
                        "current",
                        e.target.checked,
                        index
                      )
                    }
                  />
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="form-control mt-4">
              <label className="label mt-1 mb-2">
                <span className="label-text">Description*</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 w-full"
                value={exp.description}
                onChange={(e) =>
                  onChange(
                    "workExperience",
                    "description",
                    e.target.value,
                    index
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperienceForm;
