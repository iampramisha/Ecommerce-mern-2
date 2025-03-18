import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  const [branches, setBranches] = useState(formData.branches || []);

  // Function to handle branch input changes
  const handleBranchChange = (index, value) => {
    const newBranches = [...branches];
    newBranches[index] = value; // Update the branch address
    setBranches(newBranches);
    setFormData({ ...formData, branches: newBranches });
  };

  // Function to add a new branch
  const addBranch = () => {
    setBranches([...branches, '']); // Add an empty branch address
  };
  // Function to remove a branch
  const removeBranch = (index) => {
    const newBranches = branches.filter((_, i) => i !== index);
    setBranches(newBranches);
    setFormData({ ...formData, branches: newBranches });
  };

  // Function to render branch inputs
  const renderBranchInputs = () => {
    return branches.map((branch, index) => (
      <div key={index} className="grid gap-2 mb-4">
        <Label>Branch {index + 1}</Label>
        <Input
          placeholder="Branch Address"
          value={branch}
          onChange={(e) => handleBranchChange(index, e.target.value)}
        />
        <Button type="button" onClick={() => removeBranch(index)}>
          Remove Branch
        </Button>
      </div>
    ));
  };

  // Function to render inputs by component type
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || '';

    switch (getControlItem.componentType) {
      case 'input':
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case 'select':
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case 'textarea':
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case 'dynamicBranches':
        element = (
          <div>
            {renderBranchInputs()}
            <Button type="button" onClick={addBranch} className="mt-2">
              Add Branch
            </Button>
          </div>
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>

      <Button type="submit" className="mt-2 w-full">
        {buttonText || 'Submit'}
      </Button>
    </form>
  );
}

export default CommonForm;