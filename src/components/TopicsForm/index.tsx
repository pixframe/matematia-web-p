import React from 'react';
import getStorageUrl from '../../utils/storage';
import { CustomError, FormHandlerChildrenProps, InputSelect } from '@calderaro/react-toolbox';
import InputText from '../Input/InputText';
import InputTextarea from '../Input/InputTextarea';
import InputImage from '../Input/InputImage';
import Editor from '../Input/Editor';
import SimpleListHandler from '../../components/SimpleListHandler';
import SimpleListContainer from '../../components/SimpleListContainer';
import SubTopicSelectListItem from '../../components/SubTopicSelectListItem';
import { Topic, ResourceKind } from '../../utils/types';
import { resourcesOptions } from '../../constants/resourcesKind';
import { subtopicsList } from '../../services/Subtopics';
import FormSectionNav from '../FormSectionNav';
import styles from './styles';

interface Props extends FormHandlerChildrenProps<Topic> {
  path: string;
}

const TopicsForm: React.FC<Props> = ({ state, onChange }) => {
  const { data } = state;

  console.log({ state });

  const interactionSubtopics = (id: string, isSelected: boolean) => {
    if (isSelected) {
      removeSubtopic(id);
    } else {
      addSubtopic(id);
    }
  };

  const addResource = () => {
    const newValue = [...data.resources, { label: '', link: '', kind: 'web' as ResourceKind }];
    onChange(newValue, 'resources');
  };

  const removeResource = (index: number) => {
    const newValue = [...data.resources];
    newValue.splice(index, 1);
    onChange(newValue, 'resources');
  };

  const changeSubtopicName = (value: string, index: number) => {
    const newValue = [...data.subtopicNames];
    newValue[index] = value;
    onChange(newValue, 'subtopicNames');
  };

  const changePrerequisite = (value: string, index: number) => {
    const newValue = [...data.prerequisites];
    newValue[index] = value;
    onChange(newValue, 'prerequisites');
  };

  const changeLabel = (value: string, index: number) => {
    const newValue = [...data.resources];
    newValue[index].label = value;
    onChange(newValue, 'resources');
  };

  const changeLink = (value: string, index: number) => {
    const newValue = [...data.resources];
    newValue[index].link = value;
    onChange(newValue, 'resources');
  };

  const changeResourceType = (value: ResourceKind, index: number) => {
    const newValue = [...data.resources];
    newValue[index].kind = value;
    onChange(newValue, 'resources');
  };

  const addPrerquisite = () => {
    const prerequisites = [...data.prerequisites];
    prerequisites.push('');
    onChange(prerequisites, 'prerequisites');
  };

  const addSubtopic = (id: string) => {
    const newValue = [...data.subtopics];
    newValue.push(id);
    onChange(newValue, 'subtopics');
  };

  const addSubtopicName = () => {
    const subtopicNames = [...data.subtopicNames];
    subtopicNames.push('');
    onChange(subtopicNames, 'subtopicNames');
  };

  const removePrerequisite = (inputData: string) => {
    const newValue = [...data.prerequisites];
    const index = newValue.findIndex((item) => inputData === item);
    newValue.splice(index, 1);
    onChange(newValue, 'prerequisites');
  };

  const removeSubtopic = (id: string) => {
    const newValue = [...data.subtopics];
    const index = newValue.findIndex((item) => id === item);
    newValue.splice(index, 1);
    onChange(newValue, 'subtopics');
  };

  const removeSubtopicName = (inputData: string) => {
    const newValue = [...data.subtopicNames];
    const index = newValue.findIndex((item) => inputData === item);
    newValue.splice(index, 1);
    onChange(newValue, 'subtopicNames');
  };

  return (
    <div className={styles.formContainer}>
      <div>
        <h1>Topic Info</h1>
        <InputText
          id="name"
          label="Name"
          value={data.name}
          onChange={(value) => onChange(value, 'name')}
          error={(state.error as CustomError)?.errors['name']?.[0]}
        />
        <InputText
          id="country"
          label="Country"
          value={data.country}
          onChange={(value) => onChange(value, 'country')}
        />
        <InputText
          id="city"
          label="City"
          value={data.city}
          onChange={(value) => onChange(value, 'city')}
        />
        <InputImage
          label="Cover"
          value={data.sceneImage}
          onChange={(value) => {
            onChange(value, 'sceneImage');
          }}
          parser={getStorageUrl}
        />
        <InputText
          id="code"
          label="Code"
          value={data.code}
          onChange={(value) => onChange(value, 'code')}
        />
        <h1>Prerequisitos</h1>
        {data.prerequisites.map((pre, index) => (
          <div key={`prerequisite${index}`} className={styles.resourcesRow}>
            <InputText
              id={`prerequisite${index}`}
              value={pre}
              label={`prerequisite code ${index + 1}`}
              onChange={(value) => changePrerequisite(value, index)}
              containerClassname={styles.subtopicInput}
            />
            <button onClick={() => removePrerequisite(pre)} className={styles.colorButton}>
              Eliminar subtema
            </button>
          </div>
        ))}
        <button onClick={addPrerquisite} className={styles.colorButton}>
          Add prerequisite
        </button>
        <InputText
          id="videoID"
          label="Video Youtube ID"
          value={data.videoID}
          onChange={(value) => onChange(value, 'videoID')}
        />
        <InputTextarea
          id="description"
          label="Description"
          value={data.description}
          onChange={(value) => onChange(value, 'description')}
        />
        <Editor
          id="post"
          value={data.post}
          onChange={(value) => {
            onChange(value.value, 'post');
          }}
          label="Post"
          error={(state.error as CustomError)?.errors['post']?.[0]}
        />
        <h1>Subtemas</h1>
        {data.subtopicNames.map((sName, index) => (
          <div key={`subtopicName${index}`} className={styles.resourcesRow}>
            <InputText
              id={`subtopicName${index}`}
              value={sName}
              label={`Subtopic name ${index + 1}`}
              onChange={(value) => changeSubtopicName(value, index)}
              containerClassname={styles.subtopicInput}
            />
            <button onClick={() => removeSubtopicName(sName)} className={styles.colorButton}>
              Eliminar subtema
            </button>
          </div>
        ))}
        <button onClick={addSubtopicName} className={styles.colorButton}>
          Add subtopic
        </button>
        <div className={styles.resourcesDiv}>
          <h1>Resources</h1>
          <div>
            {data.resources.map((resource, index) => {
              return (
                <div key={`resource_${index}`} className={styles.resourcesRow}>
                  <InputText
                    id={`label${index}`}
                    label={`Resource ${index + 1} label`}
                    value={resource.label}
                    onChange={(value) => changeLabel(value, index)}
                    containerClassname={styles.resourcesInput}
                  />
                  {resource.kind !== 'bibliografy' && (
                    <InputText
                      id={`link${index}`}
                      label={`Resource ${index + 1} link`}
                      value={resource.link}
                      onChange={(value) => changeLink(value, index)}
                      containerClassname={styles.resourcesInput}
                    />
                  )}
                  <InputSelect
                    id="mode"
                    value={resource.kind}
                    label="Tipo"
                    onChange={(value) => changeResourceType(value as ResourceKind, index)}
                    options={resourcesOptions}
                  />
                  <button onClick={() => removeResource(index)}>Delete</button>
                </div>
              );
            })}
          </div>
          <button onClick={addResource} className={styles.addResource}>
            Add resource
          </button>
        </div>
      </div>
      <div>
        <h1>Desing</h1>
        <InputText
          id="primaryColor"
          label="Primary Color"
          value={data.primaryColor}
          onChange={(value) => onChange(value, 'primaryColor')}
        />
        <InputText
          id="secondaryColor"
          label="Secondary Color"
          value={data.secondaryColor}
          onChange={(value) => onChange(value, 'secondaryColor')}
        />
        <InputText
          id="accentColor"
          label="Accent Color"
          value={data.accentColor}
          onChange={(value) => onChange(value, 'accentColor')}
        />
        <InputText
          id="accentSecondaryColor"
          label="Accent Secondary Color"
          value={data.accentSecondaryColor}
          onChange={(value) => onChange(value, 'accentSecondaryColor')}
        />
      </div>
      <FormSectionNav options={[{ id: 'subtopics', label: 'Subtopics' }]} selected="subtopics" />
      <SimpleListHandler list={subtopicsList} params={{}}>
        {(ListProps) => (
          <SimpleListContainer
            {...ListProps}
            status={ListProps.state.status}
            data={ListProps.state.data}
            page={1}
            pages={1}
          >
            {ListProps.state.data
              .sort((a, b) => {
                return a.name.localeCompare(b.name);
              })
              .map((item) => (
                <SubTopicSelectListItem
                  key={item.id}
                  id={item.id}
                  label={item.name}
                  isSelected={data.subtopics.includes(item.id)}
                  onSelection={interactionSubtopics}
                />
              ))}
          </SimpleListContainer>
        )}
      </SimpleListHandler>
    </div>
  );
};

export default TopicsForm;
